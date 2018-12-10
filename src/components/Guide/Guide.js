import React, { Component } from "react";
import PropTypes from "prop-types";
import Background from "./Background";
import Icon from "./Icon";
import Route from "./Route";
import "../../assets/twitter.svg";
import "../../assets/facebook.svg";

class Guide extends Component {
  render() {
    const { config, routeId } = this.props;
    const { icons, canvas } = config;
    const { width, height } = canvas;

    const route = config.routes[routeId];
    if (!route) {
      return <div>Route not found</div>;
    }

    const start = route[0];
    const dest = route[route.length - 1];

    return (
      <div className="guide">
        <svg width={width} height={height}>
          <Background width={width} height={height} />
          <Icon x={start[0]} y={start[1]} icon={icons.start} />
          <Icon x={dest[0]} y={dest[1]} icon={icons.destination} />
          <Route points={route} />
        </svg>
      </div>
    );
  }
}

Guide.propTypes = {
  config: PropTypes.object.isRequired,
  routeId: PropTypes.string.isRequired
};

export default Guide;
