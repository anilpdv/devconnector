import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profile";

export class Dashboard extends Component {
  componentDidMount() {
    if (this.props.getCurrentProfile) {
      this.props.getCurrentProfile();
    }
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile
      ? this.props.profile
      : { profile: "", loadig: "" };

    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = (
        <Loader
          type="ThreeDots"
          style={{ position: "fixed", top: "45%", left: "50%" }}
          color="#989898"
          height={40}
          width={40}
        />
      );
    } else {
      if (Object.keys(profile).lenght > 0) {
        dashboardContent = <h1>TODO : add proile data in it</h1>;
      } else {
        dashboardContent = (
          <p className="text-muted">welcome {user ? user.name : ""}</p>
        );
      }
    }

    return (
      <div className="Dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="dispaly-4">{dashboardContent}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
