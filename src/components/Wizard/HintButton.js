import React, { Component } from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";

class HintButton extends Component {
  handleClick = () => {
    const { hintLevel, hintTypes, onHintLevelChange } = this.props;

    const newHintLevel = hintLevel + 1;
    const hints = hintTypes.reduce((acc, hintType, index) => {
      acc[hintType] = newHintLevel >= index;
      return acc;
    }, {});
    onHintLevelChange(newHintLevel, hints);
  };

  render() {
    const { hintLevel, hintTypes } = this.props;
    const maxHintLevel = hintTypes.length - 1;
    const numberOfHints = maxHintLevel - hintLevel;
    const isDisabled = hintLevel >= maxHintLevel;
    return (
      <div className="mb-4 text-center">
        <Button
          className="w-50"
          size="sm"
          color="info"
          onClick={this.handleClick}
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
  hintTypes: PropTypes.array.isRequired,
  onHintLevelChange: PropTypes.func.isRequired
};

export default HintButton;
