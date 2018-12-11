import React, { Component } from "react";
import PropTypes from "prop-types";

class Background extends Component {
  render() {
    const { width, height } = this.props;
    return (
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        fill="lightgrey"
        stroke="black"
      />
    );
  }
}

Background.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default Background;
