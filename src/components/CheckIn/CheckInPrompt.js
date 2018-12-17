import React, { Component } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import PropTypes from "prop-types";
import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { SECRET_IDENTIFIER } from "../../constants";

const MAX_HINT_LEVEL = 1;

class CheckInPrompt extends Component {
  state = { id: "", hintLevel: 0 };

  handleSubmit = e => {
    e.preventDefault();

    const { isLoading, onCheckIn } = this.props;
    if (isLoading) {
      return;
    }

    const { id } = this.state;
    onCheckIn(id);
  };

  handleIdChange = event => {
    this.setState({ id: event.target.value });
  };

  handleHint = () => {
    const { hintLevel } = this.state;
    this.setState({ hintLevel: hintLevel + 1 });
  };

  renderDescription() {
    const { hintLevel } = this.state;
    const areHintsAvailable = hintLevel < MAX_HINT_LEVEL;
    return (
      <div>
        <div>What's the matter, Santa?</div>
        <div>
          Can you help Santa Claus to check-in for an appointment? Do you know
          your FHIR? What about GDPR?
        </div>
        <Button
          className="mt-1"
          size="sm"
          color="info"
          onClick={this.handleHint}
          disabled={!areHintsAvailable}
        >
          Hint!
        </Button>
      </div>
    );
  }

  renderCard(id, hintLevel, isLoading) {
    const placeholder = hintLevel > 0 ? SECRET_IDENTIFIER : "";
    return (
      <Card
        title={<span>Check-in</span>}
        infoText={<span>Please type your ID</span>}
      >
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Input
              bsSize="lg"
              value={id}
              onChange={this.handleIdChange}
              className="text-center"
              placeholder={placeholder}
            />
            <button
              className="btn btn-primary btn-lg mt-1 btn-block"
              type="submit"
              disabled={!id}
            >
              {isLoading ? (
                <FontAwesomeIcon icon={faCircleNotch} spin />
              ) : (
                "Check in"
              )}
            </button>
          </FormGroup>
        </Form>
      </Card>
    );
  }

  render() {
    const { id, hintLevel } = this.state;
    const { isLoading } = this.props;
    return (
      <div className="check-in">
        {this.renderDescription(hintLevel)}
        {this.renderCard(id, hintLevel, isLoading)}
      </div>
    );
  }
}

CheckInPrompt.propTypes = {
  onCheckIn: PropTypes.func.isRequired
};

export default CheckInPrompt;
