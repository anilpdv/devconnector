import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;
    // Get first name
    let firstName;
    if (profile) {
      if (profile.user.name) {
        firstName = profile.user.name.trim().split(" ")[0];
      }
    }
    // Get skills
    const skills = profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {skill}
      </div>
    ));
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h1 className="text-center text-info">{firstName} 's bio</h1>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span>{firstName} doesn't have a bio</span>
              ) : (
                <p>{profile.bio}</p>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">Skill set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileAbout;
