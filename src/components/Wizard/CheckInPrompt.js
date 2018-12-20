import React, { Component } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";
import HintButton from "./HintButton";
import Hint from "./Hint";
import { getPatientSearchUrlParts } from "../../utils/fhirUtils";
import {
  SECRET_IDENTIFIER,
  SECRET_NAME,
  CHECK_IN_HINT,
  CHECK_IN_HINT_LEVELS
} from "../../constants";

class CheckInPrompt extends Component {
  state = { id: "" };

  isHintAvailable(hintType) {
    const { hints } = this.props;
    return hints[hintType];
  }

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

  handleHintLevelChange = (hintLevel, hints) => {
    const { onHintLevelChange } = this.props;

    if (hints[CHECK_IN_HINT.ID]) {
      this.setState({ id: SECRET_IDENTIFIER });
    }

    onHintLevelChange(hintLevel, hints);
  };

  renderCard() {
    const { id } = this.state;
    const { isLoading } = this.props;

    return (
      <Card
        title={<span>Check-in</span>}
        infoText={<span>Please type in your ID</span>}
      >
        {this.renderHint()}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Input
              bsSize="lg"
              value={id}
              onChange={this.handleIdChange}
              className="text-center"
              disabled={isLoading}
            />
            <button
              className="btn btn-primary btn-lg mt-1 btn-block"
              type="submit"
              disabled={!id || isLoading}
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

  renderHint() {
    const [baseUrl, urlSuffix] = getPatientSearchUrlParts(SECRET_NAME);
    const text = this.isHintAvailable(CHECK_IN_HINT.CLICK)
      ? "Click me!"
      : urlSuffix;
    return (
      <div className="mb-1">
        <Hint
          isVisible={this.isHintAvailable(CHECK_IN_HINT.PATIENT)}
          primaryText={text}
          baseUrl={baseUrl}
          urlSuffix={urlSuffix}
        />
      </div>
    );
  }

  render() {
    const { hintLevel } = this.props;
    return (
      <div className="check-in">
        <div className="my-4">
          <div className="alert alert-info">
            <strong>Santa Claus is ill!</strong> Please help Santa to check-in
            for an appointment. Use{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.hl7.org/fhir/patient.html#search"
            >
              <strong>FHIR Patient search</strong>
            </a>{" "}
            and{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://hapi.fhir.org/"
            >
              <strong>FHIR test server</strong>
            </a>
            .
          </div>
        </div>
        <HintButton
          hintLevel={hintLevel}
          hintTypes={CHECK_IN_HINT_LEVELS}
          onHintLevelChange={this.handleHintLevelChange}
        />
        {this.renderCard()}
      </div>
    );
  }
}

CheckInPrompt.propTypes = {
  hintLevel: PropTypes.number,
  hints: PropTypes.object,
  isLoading: PropTypes.bool,
  onCheckIn: PropTypes.func.isRequired,
  onHintLevelChange: PropTypes.func.isRequired
};

export default CheckInPrompt;
