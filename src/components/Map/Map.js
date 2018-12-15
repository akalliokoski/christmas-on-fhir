import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "../CheckIn/Card";
import Spiral from "./Spiral";

class Map extends Component {
  render() {
    const { title, config, onClose } = this.props;
    const { canvas } = config;
    const { width, height } = canvas;
    const center = [0.5 * width, 0.5 * height];
    return (
      <div className="guide">
        <Card title={title} actionButtonText="Close" onAction={onClose}>
          <svg viewBox={`0 0 ${width} ${height}`}>
            <Spiral center={center} />
          </svg>
        </Card>
      </div>
    );
  }
}

Map.propTypes = {
  title: PropTypes.element.isRequired,
  config: PropTypes.object.isRequired,
  onClose: PropTypes.func
};

export default Map;
