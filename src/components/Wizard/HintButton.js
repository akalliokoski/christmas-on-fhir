import React, { Component } from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";

class HintButton extends Component {
  render() {
    const { hintLevel, maxHintLevel, onHintRequested } = this.props;
    const numberOfHints = maxHintLevel - hintLevel;
    const isDisabled = hintLevel >= maxHintLevel;
    return (
      <div className="mb-4 text-center">
        <Button
          className="w-50"
          size="sm"
          color="info"
          onClick={onHintRequested}
          disabled={isDisabled}
        >
          Give me a hint!
          <span className="badge badge-pill badge-primary float-right">
            {numberOfHints}
          </span>
        </Button>
      </div>
    );
  }
}

HintButton.propTypes = {
  hintLevel: PropTypes.number.isRequired,
  maxHintLevel: PropTypes.number.isRequired,
  onHintRequested: PropTypes.func.isRequired
};

export default HintButton;
