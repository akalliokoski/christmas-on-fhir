import React, { Component } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import PropTypes from "prop-types";
import Card from "./Card";
import HintButton from "./HintButton";
import Hint from "./Hint";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { SECRET_IDENTIFIER, SECRET_NAME } from "../../constants";
import { getPatientSearchUrlParts } from "../../utils/fhirUtils";

const MAX_HINT_LEVEL = 3;
const PATIENT_HINT = 1;
const CLICK_HINT = 2;
const ID_HINT = 3;

class CheckInPrompt extends Component {
  state = { id: "" };

  isHintAvailable(hint) {
    const { hintLevel } = this.props;
    return hintLevel >= hint;
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

  handleHintRequested = () => {
    const { onHintRequested } = this.props;

    if (this.isHintAvailable(ID_HINT - 1)) {
      this.setState({ id: SECRET_IDENTIFIER });
    }

    onHintRequested();
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

  renderHint() {
    const [baseUrl, urlSuffix] = getPatientSearchUrlParts(SECRET_NAME);
    const text = this.isHintAvailable(CLICK_HINT) ? "Click me!" : urlSuffix;
    return (
      <div className="mb-1">
        <Hint
          isVisible={this.isHintAvailable(PATIENT_HINT)}
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
          maxHintLevel={MAX_HINT_LEVEL}
          onHintRequested={this.handleHintRequested}
        />
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
