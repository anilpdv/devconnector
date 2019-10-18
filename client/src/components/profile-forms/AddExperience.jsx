import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addExperience } from "../../actions/profile";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: "",
      disable: false,
      toDateDisabled: false
    };
  }

  alertError = errorMsg =>
    toast.error(errorMsg, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      const { errors } = this.props;
      if (errors) {
        if (errors.errors) {
          this.alertError(errors.errors[0].msg.capitalize());
        }
      }
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.props;
    const { company, title, from, to, current, location } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <ToastContainer />
            <Fragment>
              <h1 className="large text-primary">Add Your Experience</h1>
              <p className="lead">
                <i className="fas fa-code-branch" /> Add your company or title
                and working location.{" "}
              </p>
              <small>* = required field</small>
              <form
                className="form"
                onSubmit={e => {
                  e.preventDefault();
                  this.props.addExperience(
                    { company, title, from, to, current, location },
                    this.props.history
                  );
                }}
              >
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="* Company if working"
                    name="company"
                    value={this.state.company}
                    onChange={e => this.onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="* Title of the job "
                    name="title"
                    value={this.state.title}
                    onChange={e => this.onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="location of your company"
                    name="location"
                    value={this.state.location}
                    onChange={e => this.onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <h4>From Date</h4>
                  <input
                    className="form-control"
                    type="date"
                    name="from"
                    value={this.state.from}
                    onChange={e => this.onChange(e)}
                  />
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    checked={this.state.current}
                    value={this.state.current}
                    id="exampleCheck1"
                    onChange={() => {
                      this.setState({
                        current: !this.state.current,
                        toDateDisabled: !this.state.toDateDisabled
                      });
                    }}
                  />{" "}
                  <label htmlFor="exampleCheck1" className="form-check-label">
                    Current School
                  </label>
                </div>

                <div className="form-group">
                  <h4>To Date</h4>
                  <input
                    className="form-control"
                    type="date"
                    name="to"
                    value={this.state.to}
                    onChange={e => this.onChange(e)}
                    disabled={this.state.toDateDisabled ? "disabled" : ""}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Program Description"
                    value={this.state.description}
                    onChange={e => this.onChange(e)}
                    className="form-control"
                  />
                </div>
                <input
                  className="form-control"
                  type="submit"
                  className="btn btn-primary my-1"
                />
                <Link className="btn btn-light my-1" to="/dashboard">
                  Go Back
                </Link>
              </form>
            </Fragment>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addExperience }
)(AddExperience);
