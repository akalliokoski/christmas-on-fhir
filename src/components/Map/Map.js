import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "../Wizard/Card";
import Spiral from "./Spiral";

class Map extends Component {
  render() {
    const { title, infoText, config, onBack } = this.props;
    const { canvas } = config;
    const { width, height } = canvas;
    const center = [0.5 * width, 0.5 * height];
    return (
      <div className="guide">
        <Card
          title={title}
          infoText={infoText}
          actionButtonText="Back"
          onAction={onBack}
        >
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
  infoText: PropTypes.element,
  config: PropTypes.object.isRequired,
  onBack: PropTypes.func
};

export default Map;
