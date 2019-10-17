import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addEducation } from "../../actions/profile";

export class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "",
      to: "",
      current: false,
      description: "",
      errors: "",
      disable: false,
      fieldofstudy: "",
      toDateDisabled: false,
      degree: ""
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.props;
    const { school, degree, from, to, current, fieldofstudy } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Fragment>
              <h1 className="large text-primary">Add Your Education</h1>
              <p className="lead">
                <i className="fas fa-code-branch" /> Add any school or bootcamp
                that you have attended
              </p>
              <small>* = required field</small>
              <form
                className="form"
                onSubmit={e => {
                  e.preventDefault();
                  this.props.addEducation(
                    { school, degree, from, to, current, fieldofstudy },
                    this.props.history
                  );
                }}
              >
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="* School or Bootcamp"
                    name="school"
                    value={this.state.school}
                    onChange={e => this.onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="* Degree or Certificate"
                    name="degree"
                    value={this.state.degree}
                    onChange={e => this.onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Field of Study"
                    name="fieldofstudy"
                    value={this.state.fieldofstudy}
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
  { addEducation }
)(AddEducation);
