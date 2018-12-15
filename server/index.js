const { GraphQLServer } = require("graphql-yoga");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/test5",
  { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

const Employee = mongoose.model("Employee", {
  employeeId: {
    type: Number,
    required: true,
    unique: true
  },
  firstName: String,
  lastName: String,
  address: String,
  company: String,
  salary: Number
});

const typeDefs = `
  type Query {
    employees: [Employee]
  }
  type Employee {
    employeeId: Int!
    firstName: String!
    lastName: String!
    address: String
    company: String!
    salary: Int!
  }
  type Mutation {
      createEmployee(
          employeeId: Int!, 
          firstName: String!, 
          lastName: String!, 
          address: String, 
          company: String!, 
          salary: Int!) : Employee
      updateEmployee(
          employeeId: Int!, 
          firstName: String!, 
          lastName: String!, 
          address: String, 
          company: String!, 
          salary: Int!) : Boolean
      removeEmployee(
          employeeId: Int!) : Boolean          
  }
`;

const resolvers = {
  Query: {
    employees: () => Employee.find()
  },
  Mutation: {
    createEmployee: async (
      _,
      { employeeId, firstName, lastName, address, company, salary }
    ) => {
      const employee = new Employee({
        employeeId,
        firstName,
        lastName,
        address,
        company,
        salary
      });
      await employee.save();
      return employee;
    },
    updateEmployee: async (_, 
        { employeeId, firstName, lastName, address, company, salary }
    ) => {
        await Employee.updateOne( {employeeId : employeeId}, { $set : { 
                firstName: firstName,
                lastName: lastName,
                address: address,
                company: company,
                salary: salary }});
        return true;
    },
    removeEmployee: async (_, 
        { employeeId }
    ) => {
        await Employee.deleteOne( {employeeId : employeeId});
        return true;
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
mongoose.connection.once("open", function() {
  server.start(() => console.log("Server is running on localhost:4000"));
});