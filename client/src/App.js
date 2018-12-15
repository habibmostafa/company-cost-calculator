import React, { Component } from 'react';
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    employeeId: 0,
    firstName: "",
    lastName: "",
    address: "",
    company: "",
    salary: 0
  };

  handleEmployeeIdChange = e => {
    const newEmployeeId = parseInt(e.target.value);
    this.setState({
      employeeId: newEmployeeId,
    });
  };

  handleFirstNameChange = e => {
    const newFirstName = e.target.value;
    this.setState({
        firstName: newFirstName,
    });
  };

  handleLastNameChange = e => {
    const newLastName = e.target.value;
    this.setState({
        lastName: newLastName,
    });
  };

  handleAddressChange = e => {
    const newAddress = e.target.value;
    this.setState({
        address: newAddress,
    });
  };

  handleCompanyChange = e => {
    const newCompany = e.target.value;
    this.setState({
        company: newCompany,
    });
  };
  
  handleSalaryChange = e => {
    const newSalary = parseInt(e.target.value);
    this.setState({
        salary: newSalary,
    });
  };
  
  createEmployee = async employee => {
    await this.props.createEmployee({
      variables: {
        employeeId: employee.employeeId,
        firstName: employee.firstName,
        lastName: employee.lastName,
        address: employee.address,
        company: employee.company,
        salary: employee.salary
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

  render() {
    const {data: {loading}} = this.props;
    if (loading) {
      return null;
    }
    return (
      <div style={{ display: "flex" }}>
        <div style={{ margin: "auto", width: 400 }}>
            <TextField
            onChange={this.handleEmployeeIdChange}
            label="Employee Id"
            margin="normal"
            type="number"
            fullWidth/>
            <TextField
            onChange={this.handleFirstNameChange}
            label="First Name"
            margin="normal"
            fullWidth/>
            <TextField
            onChange={this.handleLastNameChange}
            label="Last Name"
            margin="normal"
            fullWidth/>
            <TextField
            onChange={this.handleAddressChange}
            label="Address"
            margin="normal"
            fullWidth/>
            <TextField
            onChange={this.handleCompanyChange}
            label="Company"
            margin="normal"
            fullWidth/>
            <TextField
            onChange={this.handleSalaryChange}
            label="Salary"
            margin="normal"
            type="number"
            fullWidth/>
            <Button variant="contained" type="submit" onClick={() => this.createEmployee(this.state)}>
            Submit
            </Button>
          </div>
        </div>
    );
      }
    }

export default compose(
  graphql(CreateEmployeeMutation, { name: "createEmployee"}),
  graphql(EmployeesQuery)
)(App);

