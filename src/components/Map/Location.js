import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../assets/location.svg";

class Location extends Component {
  render() {
    const { x, y, icon } = this.props;
    const { width, height } = icon;
    const transform = `translate(${x} ${y})`;
    return (
      <g width={width} height={height} transform={transform}>
        <use
          x={-width / 2}
          y={-height / 2}
          width={width}
          height={height}
          href="#location"
        />
        <circle cx="0" cy="0" r="5" fill="lightblue" />
      </g>
    );
  }
}

Location.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  icon: PropTypes.object.isRequired
};

export default Location;
