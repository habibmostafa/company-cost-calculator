import React, { Component } from 'react';
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const EmployeesQuery =
gql`{
  employees {
    employeeId
    firstName
    lastName
    address
    company
    salary
  }
}`;
class App extends Component {
  render() {
    const {data: {loading, employees}} = this.props;
    if (loading) {
      return null;
    }
    return <div>
        {employees.map(employee => (<div key={`${employee.employeeId}-employee`}>{employee.firstName}</div>))}
      </div>;
  }
}

export default graphql(EmployeesQuery)(App);
