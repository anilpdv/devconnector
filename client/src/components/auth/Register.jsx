import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser, setErrorsEmpty } from "../../actions/auth";

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: ""
    };
  }

  componentDidMount() {
    if (this.props.setErrorsEmpty) {
      this.props.setErrorsEmpty();
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = async e => {
    const { name, email, password, password2 } = this.state;
    e.preventDefault();
    try {
      this.props.registerUser(
        { name, email, password, password2 },
        this.props.history
      );
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const { errors } = this.props;

    console.log(errors);
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              {errors ? (
                errors.errors ? (
                  <div className="alert alert-danger text-center" role="alert">
                    {errors.errors ? errors.errors[0].msg.capitalize() : ""}
                  </div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}

              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form action="create-profile.html" onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Name"
                    name="name"
                    noValidate
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    noValidate
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                  />
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};
export default connect(
  mapStateToProps,
  { registerUser, setErrorsEmpty }
)(Register);
