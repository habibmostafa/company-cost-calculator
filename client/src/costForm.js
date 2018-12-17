import React from "react";
import TextField from "material-ui/TextField";
import Button from '@material-ui/core/Button';

export default class CostForm extends React.Component {
state = {
    company: ""
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
        company: ""
      });
  };

  render() {
    return (
        <div style={{ textAlign: "center"}}>
      <form>
        <TextField
        name="company"
        hintText="Company"
        label="Company"
        margin="normal"
        value={this.state.company}
        onChange={e => this.change(e)}
        floatingLabelFixed
        />
        <Button variant="contained" onClick={e => this.onSubmit(e)} primary="true">
        Calculate Sum
      </Button>
      </form>
      </div>
      
    );
  }
}