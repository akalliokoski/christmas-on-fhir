import React, { Component } from "react";
import PropTypes from "prop-types";

class Hint extends Component {
  render() {
    const { url } = this.props;
    return (
      <a target="_blank" rel="noopener noreferrer" href={url}>
        <span class="badge badge-info">Hint</span>
      </a>
    );
  }
}

Hint.propTypes = {
  url: PropTypes.string.isRequired
};

export default Hint;
