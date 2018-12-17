import React from "react";
import TextField from "material-ui/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export default class EntryForm extends React.Component {
  state = {
    employeeId: "",
    firstName: "",
    lastName: "",
    address: "",
    company: "",
    salary: "",
    error: ""
  };

  change = e => {
    this.setState({
      error: ""
    });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  _handleKeyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (
        this.state.employeeId != null &&
        this.state.employeeId.length > 0 &&
        this.state.firstName != null &&
        this.state.firstName.length > 0 &&
        this.state.lastName != null &&
        this.state.lastName.length > 0 &&
        this.state.company != null &&
        this.state.company.length > 0 &&
        this.state.salary != null &&
        this.state.salary.length > 0
      ) {
        this.onSubmit(e);
      } else {
        this.setState({
          error: "All but 'Address' must be filled out"
        });
      }
    }
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
      <form>
        <TextField
          name="employeeId"
          hintText="Employee ID"
          label="Employee ID"
          margin="normal"
          type="number"
          value={this.state.employeeId}
          onChange={e => this.change(e)}
          onKeyPress={e => {
            this._handleKeyPress(e);
          }}
        />
        <br />
        <TextField
          name="firstName"
          hintText="First Name"
          label="First Name"
          margin="normal"
          value={this.state.firstName}
          onChange={e => this.change(e)}
          onKeyPress={e => {
            this._handleKeyPress(e);
          }}
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
          onKeyPress={e => {
            this._handleKeyPress(e);
          }}
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
          onKeyPress={e => {
            this._handleKeyPress(e);
          }}
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
          onKeyPress={e => {
            this._handleKeyPress(e);
          }}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="salary"
          hintText="Salary"
          label="Salary"
          margin="normal"
          type="number"
          value={this.state.salary}
          onChange={e => this.change(e)}
          onKeyPress={e => {
            this._handleKeyPress(e);
          }}
          floatingLabelFixed
        />
        <br />
        <br />
        <Button
          variant="contained"
          onClick={e => this.onSubmit(e)}
          primary="true"
        >
          Submit
        </Button>
        <br />
        <br />
        <Typography component="p" color="error">
        {this.state.error}
        </Typography>

      </form>
    );
  }
}
