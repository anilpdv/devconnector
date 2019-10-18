import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Experience extends Component {
  render() {
    const experience = this.props.experience.map(exp => (
      <tr className="" key={exp._id}>
        <td className="row">{exp.company}</td>
        <td className="row">{exp.title}</td>
        <td className="row">
          {exp.from} - {exp.to}
        </td>
        <td>
          <button className="btn btn-danger">delete</button>
        </td>
      </tr>
    ));
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th className="col">company</th>
              <th className="col">title</th>
              <th className="col">years</th>
            </tr>
          </thead>
          <tbody>
            <tr>{experience}</tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  experience: PropTypes.object.isRequired
};

export default connect(null)(Experience);
