import React, { Component } from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";

class HintButton extends Component {
  render() {
    const { isDisabled, onHintRequested } = this.props;
    return (
      <div className="mb-4">
        <Button
          className="w-25 btn-block"
          size="sm"
          color="info"
          onClick={onHintRequested}
          disabled={isDisabled}
        >
          Give me a hint!
        </Button>
      </div>
    );
  }
}

HintButton.propTypes = {
  isDisabled: PropTypes.bool,
  onHintRequested: PropTypes.func.isRequired
};

export default HintButton;
