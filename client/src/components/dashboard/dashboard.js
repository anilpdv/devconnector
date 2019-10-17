import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";
import { getCurrentProfile, deleteProfile } from "../../actions/profile";
import { setErrorsEmpty, setLoggedIn } from "../../actions/auth";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class Dashboard extends Component {
  componentDidMount() {
    if (this.props.getCurrentProfile) {
      this.props.getCurrentProfile();
    }

    if (this.props.setErrorsEmpty) {
      this.props.setErrorsEmpty();
    }

    if (this.props.auth.loggedIn) {
      this.alertSuccess();
      this.props.setLoggedIn(false);
    }
  }

  alertSuccess = () =>
    toast.success("Successfully logged in", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });

  render() {
    const { user } = this.props.auth ? this.props.auth : { user: "" };

    const { profile, loading } = this.props.profile
      ? this.props.profile
      : { profile: "", loading: "" };

    let dashboardContent;
    if (profile === null || loading) {
      console.log({ profile });
      console.log({ loading });
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
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <Fragment>
            <p>
              welcome to
              <Link to={`/profile/${profile.profile.handle}`}>
                {" "}
                {user.name}{" "}
              </Link>
            </p>
            <ProfileActions />
            {/* TODO : education and profile */}
            <div className="delete">
              <button
                className="btn btn-danger"
                onClick={() => {
                  this.props.deleteProfile();
                }}
              >
                Delete
              </button>
            </div>
          </Fragment>
        );
      } else {
        dashboardContent = (
          <div>
            <p className="">welcome {user ? user.name : ""}</p>
            <span className="text-muted pr-4">
              we cannot find profile, create a profile here!
            </span>
            <Link className="btn btn-success" to="/create-profile">
              create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="Dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="dispaly-4">{dashboardContent}</div>
              <ToastContainer />
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

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteProfile, setErrorsEmpty, setLoggedIn }
)(Dashboard);
