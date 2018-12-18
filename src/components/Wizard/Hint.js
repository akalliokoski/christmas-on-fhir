import React, { Component } from "react";
import PropTypes from "prop-types";

class Hint extends Component {
  render() {
    const { url, isVisible } = this.props;
    const visibleClass = isVisible ? "visible" : "invisible";
    return (
      <a
        className={visibleClass}
        target="_blank"
        rel="noopener noreferrer"
        href={url}
      >
        <span class="badge badge-info">Hint</span>
      </a>
    );
  }
}

Hint.propTypes = {
  url: PropTypes.string.isRequired,
  isVisible: PropTypes.bool
};

export default Hint;
