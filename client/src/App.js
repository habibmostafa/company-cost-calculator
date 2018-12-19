import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import gql from "graphql-tag";
import { graphql, compose, ApolloConsumer } from "react-apollo";
import EntryForm from "./entryForm";
import Table from "./table";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "material-ui/TextField";
import Button from "@material-ui/core/Button";

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
  }
`;

const CostQuery = gql`
query ($company: String!) {
  costOfCompany(company: $company)
}
`;

const CreateEmployeeMutation = gql`
  mutation(
    $employeeId: Int!
    $firstName: String!
    $lastName: String!
    $address: String
    $company: String!
    $salary: Int!
  ) {
    createEmployee(
      employeeId: $employeeId
      firstName: $firstName
      lastName: $lastName
      address: $address
      company: $company
      salary: $salary
    ) {
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
    company: ""
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
        data.employees.unshift(createEmployee);
        // Write our data back to the cache.
        store.writeQuery({ query: EmployeesQuery, data });
      }
    });
  };

  entryFormCallback = dataFromForm => {
    this.createEmployee(dataFromForm);
  };

  change = e => {
    // this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      //console.log('do validate: ' + e.target.name);
    }
  }

  onSubmit = e => {
    e.preventDefault();
    // clear form
    this.setState({
      company: ""
    });
  };

  onCostFetched = cost => this.setState(() => ({ cost }));

  render() {
    
    let { data } = this.props
    if (data.loading) {
      return null;
    }

    return (
      <MuiThemeProvider>
        <div className="App">
          <Grid
            container
            spacing={16}
            alignItems="flex-start"
            direction="row"
            justify="center"
          >
            <Grid key="1" item>
              <Paper
                style={{
                  margin: "auto",
                  width: 300,
                  paddingLeft: 10,
                  paddingTop: 10,
                  paddingBottom: 10
                }}
              >
                <EntryForm callbackFromApp={this.entryFormCallback} />
              </Paper>
            </Grid>
            <Grid key="2" item>
              <Paper
                style={{
                  width: 300,
                  paddingLeft: 10,
                  paddingTop: 10,
                  paddingBottom: 10
                }}
              >
              <ApolloConsumer>
              {client => (
              <div>
                Cost {this.state.cost }
                <br />
                <TextField
                    name="company"
                    hintText="Company"
                    label="Company"
                    margin="normal"
                    value={this.state.company}
                    onChange={e => this.change(e)}
                    onKeyPress={e => {this._handleKeyPress(e)}}
                    floatingLabelFixed
                  />
                  <br />
                <Button
                  variant="contained"
                  onClick={async () => {
                    const { data } = await client.query({
                      query: CostQuery,
                      variables: { company: this.state.company }
                    });
                    this.onCostFetched(data.costOfCompany);
                  }}
                  primary="true"
                >
                Calculate Cost
                </Button>
              </div>
              )}
              </ApolloConsumer>
              </Paper>
            </Grid>
          </Grid>
          <br/>
          <Table employeesFromApp={data.employees} />
          <br />
          <br />
        </div>
      </MuiThemeProvider>
    );
  }
}

const costQueryOptions = {
  options: props => ({
    variables: {
      company: ""
    },
  }),
}

export default compose(
  graphql(CreateEmployeeMutation, { name: "createEmployee" }),
  graphql(CostQuery, costQueryOptions, { name: "costOfCompany"}),
  graphql(EmployeesQuery)
)(App);
