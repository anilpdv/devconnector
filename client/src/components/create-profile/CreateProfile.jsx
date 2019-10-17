import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createProfile } from "../../actions/profile";

export class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: ""
    };
  }

  toggleSocialInputs = () => {
    console.log("toggleSocialInputs", this.state.displaySocialInputs);
    this.setState({ displaySocialInputs: !this.state.displaySocialInputs });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.createProfile(this.state, this.props.history);
  };
  3;
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.props;
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              {errors ? (
                errors.errors ? (
                  <div className="text-center alert alert-danger" role="alert">
                    {errors.errors ? errors.errors[0].msg.capitalize() : ""}
                  </div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              <h1 className="display-4 text-center">create your profile</h1>
              <p className="lead text-center">
                let's create a profile so you can stand out.
              </p>
              <small className="d-block bd-3">* = required fields</small>
              <form
                className="p-5 form"
                onSubmit={e => {
                  e.preventDefault();
                  this.props.createProfile(this.state, this.props.history);
                }}
              >
                <div className="form-group">
                  <select
                    name="status"
                    value={this.state.status}
                    onChange={e => this.onChange(e)}
                    className="form-control status"
                  >
                    <option value="0">* Select Professional Status</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">
                      Student or Learning
                    </option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                  </select>
                  <small className="form-text">
                    Give us an idea of where you are at in your career
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Company"
                    name="company"
                    value={this.state.company}
                    onChange={e => this.onChange(e)}
                    className="form-control"
                  />
                  <small className="form-text">
                    Could be your own company or one you work for
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Handle"
                    name="handle"
                    value={this.state.handle}
                    onChange={e => this.onChange(e)}
                    className="form-control handle"
                  />
                  <small className="form-text">
                    enter the profie handle name.
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Website"
                    name="website"
                    value={this.state.website}
                    onChange={e => this.onChange(e)}
                    className="form-control"
                  />
                  <small className="form-text">
                    Could be your own or a company website
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={e => this.onChange(e)}
                    className="form-control"
                  />
                  <small className="form-text">
                    City & state suggested (eg. Boston, MA)
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="* Skills"
                    name="skills"
                    value={this.state.skills}
                    onChange={e => this.onChange(e)}
                    className="form-control skills"
                  />
                  <small className="form-text">
                    Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Github Username"
                    name="githubusername"
                    value={this.state.githubusername}
                    onChange={e => this.onChange(e)}
                    className="form-control"
                  />
                  <small className="form-text">
                    If you want your latest repos and a Github link, include
                    your username
                  </small>
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="A short bio of yourself"
                    name="bio"
                    value={this.state.bio}
                    onChange={e => this.onChange(e)}
                    className="form-control"
                  />
                  <small className="form-text">
                    Tell us a little about yourself
                  </small>
                </div>

                <div className="my-2">
                  <button
                    onClick={() => this.toggleSocialInputs()}
                    type="button"
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span>Optional</span>
                </div>
                {this.state.displaySocialInputs && (
                  <Fragment>
                    <div className="input-group social-input mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-twitter " />
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="Twitter URL"
                        name="twitter"
                        value={this.state.twitter}
                        onChange={e => this.onChange(e)}
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3 input-group social-input">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-facebook " />
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="Facebook URL"
                        name="facebook"
                        value={this.state.facebook}
                        onChange={e => this.onChange(e)}
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3 input-group social-input">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-youtube " />
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="YouTube URL"
                        name="youtube"
                        value={this.state.youtube}
                        onChange={e => this.onChange(e)}
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3 input-group social-input">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-linkedin " />
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="Linkedin URL"
                        name="linkedin"
                        value={this.state.linkedin}
                        onChange={e => this.onChange(e)}
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3 input-group social-input">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-instagram " />
                        </span>
                      </div>

                      <input
                        type="text"
                        placeholder="Instagram URL"
                        name="instagram"
                        value={this.state.instagram}
                        onChange={e => this.onChange(e)}
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3 input-group social-input">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-github" />
                        </span>
                      </div>

                      <input
                        type="text"
                        placeholder="Github URL"
                        name="instagram"
                        value={this.state.github}
                        onChange={e => this.onChange(e)}
                        className="form-control"
                      />
                    </div>
                  </Fragment>
                )}

                <div className="" style={{ marginBottom: "50px" }}>
                  <input type="submit" className="btn btn-primary my-1" />
                  <Link className="btn btn-light my-1" to="/dashboard">
                    Go Back
                  </Link>
                </div>
              </form>
            </div>
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
  { createProfile }
)(CreateProfile);
