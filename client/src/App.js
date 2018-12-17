import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import EntryForm from "./entryForm";
import CostForm from "./costForm";
import Table from "./table";

const EmployeesQuery = gql`
{
  employees {
    employeeId
    firstName
    lastName
    address
    company
    salary
  }
}`;

const CreateEmployeeMutation = gql`
  mutation(
    $employeeId: Int!, 
    $firstName: String!, 
    $lastName: String!, 
    $address: String, 
    $company: String!, 
    $salary: Int!) {
    createEmployee(
      employeeId: $employeeId,
      firstName: $firstName,
      lastName: $lastName,
      address: $address,
      company: $company,
      salary: $salary) {
        employeeId
        firstName
        lastName
        address
        company
        salary
    }
  }
`;

class App extends Component {

  state = {
    sum: ""
  };

  createEmployee = async employee => {
    await this.props.createEmployee({
      variables: {
        employeeId: parseInt(employee.employeeId),
        firstName: employee.firstName,
        lastName: employee.lastName,
        address: employee.address,
        company: employee.company,
        salary: parseInt(employee.salary)
      },
      update: (store, { data: { createEmployee } }) => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: EmployeesQuery });
        // Add our text from the mutation to the top.
        data.employees.unshift(createEmployee)
        // Write our data back to the cache.
        store.writeQuery({ query: EmployeesQuery, data });
      }
    });
  };

  entryFormCallback = (dataFromForm) => {
    this.createEmployee(dataFromForm);
  };

  costFormCallback = (dataFromForm) => {
    const company = dataFromForm.company;
    const employees = this.props.data.employees;
    var sum = 0;
    for (var key in employees) {
      if (employees[key].company === company) sum += employees[key].salary;
    }
    
    this.setState({
      sum: sum
    });

  };

  render() {
    const {data: {loading, employees}} = this.props;
    if (loading) {
      return null;
    }
    return (
      <MuiThemeProvider>
        <div className="App">
          <EntryForm callbackFromApp={this.entryFormCallback}/>
          <Table employeesFromApp={employees} />
          <br/>
          <CostForm callbackFromApp={this.costFormCallback}/>
          <br/>
          {this.state.sum}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default compose(
  graphql(CreateEmployeeMutation, { name: "createEmployee"}),
  graphql(EmployeesQuery)
)(App);