import React, { Component } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import PropTypes from "prop-types";
import Card from "./Card";
import HintButton from "./HintButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { SECRET_IDENTIFIER, SECRET_NAME } from "../../constants";
import { getPatientSearchUrl } from "../../utils/fhirUtils";

class CheckInPrompt extends Component {
  state = { id: "" };

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

  handleHintRequested = () => {
    const { hintLevel, onHintRequested } = this.props;

    if (hintLevel > 0) {
      this.setState({ id: SECRET_IDENTIFIER });
    }

    onHintRequested();
  };

  renderCard() {
    const { id } = this.state;
    const { isLoading } = this.props;
    console.log(id);

    return (
      <Card
        title={<span>Check-in</span>}
        infoText={<span>Please type in your ID</span>}
      >
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Input
              bsSize="lg"
              value={id}
              onChange={this.handleIdChange}
              className="text-center"
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

  renderResourceLink() {
    const { hintLevel } = this.props;
    if (hintLevel < 1) {
      return null;
    }

    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={getPatientSearchUrl(SECRET_NAME)}
      >
        Hint
      </a>
    );
  }

  render() {
    const { hintLevel } = this.props;
    return (
      <div className="check-in">
        <div className="my-4">
          Santa Claus is ill. Please help Santa to check-in for an appointment.
        </div>
        <HintButton
          onHintRequested={this.handleHintRequested}
          isDisabled={hintLevel >= 2}
        />
        {this.renderResourceLink()}
        {this.renderCard()}
      </div>
    );
  }
}

CheckInPrompt.propTypes = {
  hintLevel: PropTypes.number,
  onCheckIn: PropTypes.func.isRequired,
  onHintRequested: PropTypes.func.isRequired
};

export default CheckInPrompt;
