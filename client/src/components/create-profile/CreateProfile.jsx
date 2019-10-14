import React, { Component } from "react";
import { connect } from "react-redux";

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
      instagram: "",
      errors: {}
    };
  }
  render() {
    return <div>createprofile works</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(CreateProfile);
