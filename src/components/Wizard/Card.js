import React, { Component } from "react";
import {
  Button,
  Card as ReactstrapCard,
  CardTitle,
  CardText
} from "reactstrap";
import PropTypes from "prop-types";

class Card extends Component {
  renderInfoText(infoText) {
    if (!infoText) {
      return null;
    }

    return <CardText>{infoText}</CardText>;
  }

  renderActionButton(buttonText, onAction) {
    if (!buttonText) {
      return null;
    }

    return (
      <Button
        className="mt-1 btn-block"
        size="lg"
        color="primary"
        onClick={onAction}
      >
        {buttonText}
      </Button>
    );
  }

  render() {
    const {
      title,
      infoText,
      actionButtonText,
      onAction,
      children
    } = this.props;
    return (
      <div className="christmas-card">
        <ReactstrapCard
          body
          className="card text-white bg-secondary text-center"
        >
          <CardTitle>{title}</CardTitle>
          {this.renderInfoText(infoText)}
          {children}
          {this.renderActionButton(actionButtonText, onAction)}
        </ReactstrapCard>
      </div>
    );
  }
}

Card.propTypes = {
  title: PropTypes.element.isRequired,
  infoText: PropTypes.element,
  actionButtonText: PropTypes.string,
  onAction: PropTypes.func
};

export default Card;
