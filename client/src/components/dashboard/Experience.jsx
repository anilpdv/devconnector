import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profile";

export class Experience extends Component {
  onDeleteExp = id => {
    this.props.deleteExperience(id);
  };
  render() {
    const experience = this.props.experience.map(exp => (
      <tr className="" key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td className="">
          <Moment format="D MMM YYYY">{exp.from}</Moment>-
          <Moment format="D MMM YYYY">{exp.to}</Moment>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => this.onDeleteExp(exp._id)}
          >
            delete
          </button>
        </td>
      </tr>
    ));

    return (
      <Fragment>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th className="">company</th>
              <th className="">title</th>
              <th className="">years</th>
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </Fragment>
    );
  }
}

Experience.propTypes = {
  experience: PropTypes.array.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);
