import React, { Component } from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import Card from "./Card";
import HintButton from "./HintButton";
import Hint from "./Hint";
import {
  RESOURCE_TYPE,
  APPOINTMENT_HINT,
  APPOINTMENT_HINT_LEVELS
} from "../../constants";
import {
  findParticipant,
  getParticipantDisplay,
  getParticipantUrlParts,
  getAppointmentSearchUrlParts
} from "../../utils/fhirUtils";

const SHOW_TABLE_ROWS_ALWAYS = true;
const HIDDEN_VALUE = "******";

class AppointmentView extends Component {
  isHintAvailable(hintType) {
    const { hints } = this.props;
    return hints[hintType];
  }

  getParticipantDisplay(resource, hintType) {
    const isVisible = this.isHintAvailable(hintType);
    return isVisible ? getParticipantDisplay(resource) : HIDDEN_VALUE;
  }

  renderReason() {
    const { appointment } = this.props;
    if (
      !appointment ||
      !appointment.reason ||
      appointment.reason.length === 0
    ) {
      return null;
    }

    const reason = appointment.reason[0];
    const { text = "" } = reason;
    const isValueVisible = this.isHintAvailable(APPOINTMENT_HINT.REASON_HINT);
    const reasonValue = isValueVisible ? text : HIDDEN_VALUE;
    const isRowVisible = SHOW_TABLE_ROWS_ALWAYS || isValueVisible;
    const rowVisibilityClass = isRowVisible ? "" : "d-none";

    return (
      <tr className={rowVisibilityClass}>
        <td>Reason</td>
        <td>{reasonValue}</td>
        <td />
      </tr>
    );
  }

  renderParticipant(
    resourceType,
    name,
    participant,
    valueHintType,
    badgeHintType
  ) {
    const resource = findParticipant(resourceType, participant);
    if (!resource) {
      return null;
    }

    const [baseUrl, urlSuffix] = getParticipantUrlParts(resource);
    const isRowVisible =
      SHOW_TABLE_ROWS_ALWAYS ||
      this.isHintAvailable(valueHintType) ||
      this.isHintAvailable(badgeHintType);
    const rowVisibilityClass = isRowVisible ? "" : "d-none";

    return (
      <tr className={rowVisibilityClass}>
        <td>{name}</td>
        <td>{this.getParticipantDisplay(resource, valueHintType)}</td>
        <td>
          {
            <Hint
              isVisible={this.isHintAvailable(badgeHintType)}
              baseUrl={baseUrl}
              urlSuffix={urlSuffix}
            />
          }
        </td>
      </tr>
    );
  }

  renderPatient() {
    const { participant } = this.props;
    return this.renderParticipant(
      RESOURCE_TYPE.Patient,
      "Customer",
      participant,
      APPOINTMENT_HINT.CUSTOMER_VALUE,
      APPOINTMENT_HINT.CUSTOMER_HINT
    );
  }

  renderPractitioner() {
    const { participant } = this.props;
    return this.renderParticipant(
      RESOURCE_TYPE.Practitioner,
      "Practitioner",
      participant,
      APPOINTMENT_HINT.PRACTITIONER_VALUE,
      APPOINTMENT_HINT.PRACTITIONER_HINT
    );
  }

  renderLocation() {
    const { participant, onShowDirections } = this.props;
    const location = findParticipant(RESOURCE_TYPE.Location, participant);
    if (!location) {
      return null;
    }

    const isValueVisible = this.isHintAvailable(
      APPOINTMENT_HINT.LOCATION_VALUE
    );
    const isHintVisible = this.isHintAvailable(APPOINTMENT_HINT.LOCATION_HINT);
    const [baseUrl, urlSuffix] = getParticipantUrlParts(location);
    const buttonVisibleClass = isValueVisible ? "visible" : "invisible";

    const isRowVisible =
      SHOW_TABLE_ROWS_ALWAYS || isValueVisible || isHintVisible;
    const rowVisibilityClass = isRowVisible ? "" : "d-none";

    return (
      <tr className={rowVisibilityClass}>
        <td>Location</td>
        <td>
          {this.getParticipantDisplay(
            location,
            APPOINTMENT_HINT.LOCATION_VALUE
          )}
          <br />
          <Button
            className={buttonVisibleClass}
            size="sm"
            color="info"
            onClick={onShowDirections}
          >
            Map
          </Button>
        </td>
        <td>
          {
            <Hint
              isVisible={isHintVisible}
              baseUrl={baseUrl}
              urlSuffix={urlSuffix}
            />
          }
        </td>
      </tr>
    );
  }

  renderTime(appointment) {
    if (!appointment || !appointment.start) {
      return null;
    }

    return (
      <tr>
        <td>Time</td>
        <td>{appointment.start.toLocaleString()}</td>
        <td />
      </tr>
    );
  }

  renderAppointmentHint() {
    const { appointment, participant } = this.props;
    if (!appointment) {
      return null;
    }

    const patient = findParticipant(RESOURCE_TYPE.Patient, participant);
    if (!patient) {
      return null;
    }

    const [baseUrl, urlSuffix] = getAppointmentSearchUrlParts(patient);

    return (
      <div className="mb-1">
        <Hint
          isVisible={this.isHintAvailable(APPOINTMENT_HINT.APPOINTMENT_HINT)}
          baseUrl={baseUrl}
          urlSuffix={urlSuffix}
        />
      </div>
    );
  }

  renderInfoAlert() {
    return (
      <div className="my-4">
        <div className="alert alert-info">
          <strong>Can you find out some details of the appointment?</strong> Why
          Santa Claus is ill? What is the location? Who is the practitioner?
          What is the official name of Santa Claus? You will need{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.hl7.org/fhir/appointment.html#search"
          >
            <strong>FHIR Appointment search</strong>
          </a>{" "}
          and{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://hapi.fhir.org/resource?serverId=home_21&pretty=false&resource=Appointment"
          >
            <strong>FHIR test server</strong>
          </a>
          .
        </div>
      </div>
    );
  }

  renderSuccessAlert() {
    return (
      <div className="my-4">
        <div className="alert alert-success">
          <strong>All is clear now!</strong>
        </div>
      </div>
    );
  }

  isMaxHintLevel() {
    const { hintLevel } = this.props;
    return hintLevel >= APPOINTMENT_HINT_LEVELS.length - 1;
  }

  renderAlert() {
    return this.isMaxHintLevel()
      ? this.renderSuccessAlert()
      : this.renderInfoAlert();
  }

  render() {
    const { hintLevel, onClose, onHintLevelChange } = this.props;
    const showCloseButton = this.isMaxHintLevel();
    const closeButtonText = showCloseButton ? "Close" : null;

    return (
      <div className="appointment-guide">
        {this.renderAlert()}
        <HintButton
          hintLevel={hintLevel}
          hintTypes={APPOINTMENT_HINT_LEVELS}
          onHintLevelChange={onHintLevelChange}
        />
        <Card
          title={<span>Appointment</span>}
          actionButtonText={closeButtonText}
          onAction={onClose}
        >
          {this.renderAppointmentHint()}
          <div className="table-responsive">
            <table className="table text-left">
              <tbody>
                {this.renderReason()}
                {this.renderPatient()}
                {this.renderTime()}
                {this.renderPractitioner()}
                {this.renderLocation()}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  }
}

AppointmentView.propTypes = {
  appointment: PropTypes.object,
  participant: PropTypes.array,
  hintLevel: PropTypes.number,
  hints: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onShowDirections: PropTypes.func.isRequired,
  onHintLevelChange: PropTypes.func.isRequired
};

export default AppointmentView;
