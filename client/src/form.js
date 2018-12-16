import React from "react";
import TextField from "material-ui/TextField";
import Button from '@material-ui/core/Button';

export default class Form extends React.Component {
state = {
    employeeId: "",
    firstName: "",
    lastName: "",
    address: "",
    company: "",
    salary: ""
  };


  change = e => {
    // this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.callbackFromApp(this.state);
    // clear form
    this.setState({
        employeeId: "",
        firstName: "",
        lastName: "",
        address: "",
        company: "",
        salary: ""
      });
  };

  render() {
    return (
        <div style={{ textAlign: "center"}}>
      <form>
      <TextField
        name="employeeId"
        hintText="Employee ID"
        label="Employee ID"
        margin="normal"
        type="number"
        value={this.state.employeeId}
        onChange={e => this.change(e)}
        />
        <br />
        <TextField
        name="firstName"
        hintText="First Name"
        label="First Name"
        margin="normal"
        value={this.state.firstName}
        onChange={e => this.change(e)}
        floatingLabelFixed
        />
        <br />
        <TextField
        name="lastName"
        hintText="Last Name"
        label="Last Name"
        margin="normal"
        value={this.state.lastName}
        onChange={e => this.change(e)}
        floatingLabelFixed
        />
        <br />
        <TextField
        name="address"
        hintText="Address"
        label="Address"
        margin="normal"
        value={this.state.address}
        onChange={e => this.change(e)}
        floatingLabelFixed
        />
        <br />
        <TextField
        name="company"
        hintText="Company"
        label="Company"
        margin="normal"
        value={this.state.company}
        onChange={e => this.change(e)}
        floatingLabelFixed
        />
        <br />
        <TextField
        name="salary"
        hintText="Salary"
        label="Salary"
        margin="normal"
        value={this.state.salary}
        onChange={e => this.change(e)}
        floatingLabelFixed
        />
        <br />
        <Button variant="contained" onClick={e => this.onSubmit(e)} primary="true">
        Submit
      </Button>
      </form>
      </div>
      
    );
  }
}