import React from "react";
import Spinner from "react-spinkit";
import "./RegistrationForm.css";
import "./LoginForm.css";
import DataService from "../../dataService";
import Button from "antd/lib/button";

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      displayName: "",
      password: "",
    };
    this.client = new DataService();
  }

  handleRegistration = (e) => {
    e.preventDefault();
    console.log(this.state.users);
    console.log(this.state);
    this.client
      .registerUser(this.state)
      .then((result) => {
        // this.setState({ Successcode: "User registered" });
        console.log(result.data);
        alert("Success");
      })
      .catch(() => {
        alert("Error Try Registering Again");
      });
  };

  handleChange = (e) => {
    console.log(e);
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { loading, error } = this.props;
    return (
      <div className="RegistrationForm">
        <form id="registration-form" onSubmit={this.handleRegistration}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            autoFocus
            required
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={this.handleChange}
          />
          <label htmlFor="displayName">Display Name</label>
          <input
            type="text"
            name="displayName"
            required
            onChange={this.handleChange}
          />

          <Button
            type="submit"
            disabled={loading}
            onClick={this.handleRegistration}
          >
            Sign Up
          </Button>
        </form>
        {loading && <Spinner name="circle" color="blue" />}
        {error && <p style={{ color: "red" }}>{error.message}</p>}
      </div>
    );
  }
}

export default RegistrationForm;
