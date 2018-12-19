import React, { Component } from "react";
import PropTypes from "prop-types";

class Hint extends Component {
  render() {
    const { baseUrl, urlSuffix, primaryText, isVisible } = this.props;
    const visibleClass = isVisible ? "visible" : "invisible";
    const formatSeparator = urlSuffix.includes("?") ? "&" : "?";
    const text = primaryText || urlSuffix;
    return (
      <a
        className={`hint ${visibleClass}`}
        target="_blank"
        rel="noopener noreferrer"
        href={`${baseUrl}/${urlSuffix}${formatSeparator}_format=json`}
      >
        <span className="badge badge-info">{text}</span>
      </a>
    );
  }
}

Hint.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  urlSuffix: PropTypes.string.isRequired,
  primaryText: PropTypes.string,
  isVisible: PropTypes.bool
};

export default Hint;
