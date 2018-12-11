import React, { Component } from "react";
import PropTypes from "prop-types";

class Route extends Component {
  render() {
    const points = [...this.props.points];
    const d = points
      .map((point, index) => {
        return `${index === 0 ? "M" : "L"}${point[0]} ${point[1]}`;
      })
      .join(" ");
    return <path d={d} stroke="red" fill="none" />;
  }
}

Route.propTypes = {
  points: PropTypes.array.isRequired
};

export default Route;
