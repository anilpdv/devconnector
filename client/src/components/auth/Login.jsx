import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/auth";
import PropTypes from "prop-types";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  componentDidUpdate() {
    if (this.props.auth) {
      if (this.props.auth.isAuthenticated === true) {
        this.props.history.push("/dashboard");
      }
    }
  }

  render() {
    const { errors } = this.props;

    return (
      <div className="login">
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
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form action="dashboard.html" onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg email"
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg password"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.errors,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
