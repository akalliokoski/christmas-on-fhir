import React, { Component } from "react";
import PropTypes from "prop-types";

class Hint extends Component {
  render() {
    const { baseUrl, urlSuffix, isVisible } = this.props;
    const visibleClass = isVisible ? "visible" : "invisible";
    const formatSeparator = urlSuffix.includes("?") ? "&" : "?";
    return (
      <a
        className={visibleClass}
        target="_blank"
        rel="noopener noreferrer"
        href={`${baseUrl}/${urlSuffix}${formatSeparator}_format=json`}
      >
        <span className="badge badge-info">{urlSuffix}</span>
      </a>
    );
  }
}

Hint.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  urlSuffix: PropTypes.string.isRequired,
  isVisible: PropTypes.bool
};

export default Hint;
