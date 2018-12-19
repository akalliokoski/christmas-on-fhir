import React, { Component } from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import Card from "./Card";
import HintButton from "./HintButton";
import Hint from "./Hint";
import { RESOURCE_TYPE } from "../../constants";
import {
  findParticipant,
  getParticipantDisplay,
  getParticipantUrlParts,
  getAppointmentSearchUrlParts
} from "../../utils/fhirUtils";

const HINT_TYPE = {
  NO_HINT: "NO_HINT",
  LOCATION_HINT: "LOCATION_HINT",
  LOCATION_VALUE: "LOCATION_TEXT",
  PRACTITIONER_HINT: "PRACTITIONER_HINT",
  PRACTITIONER_VALUE: "PRACTITIONER_VALUE",
  CUSTOMER_HINT: "CUSTOMER_HINT",
  CUSTOMER_VALUE: "CUSTOMER_VALUE",
  APPOINTMENT_HINT: "APPOINTMENT_HINT"
};

const HINT_LEVELS = [
  HINT_TYPE.NO_HINT,
  HINT_TYPE.APPOINTMENT_HINT,
  HINT_TYPE.LOCATION_HINT,
  HINT_TYPE.LOCATION_VALUE,
  HINT_TYPE.PRACTITIONER_HINT,
  HINT_TYPE.PRACTITIONER_VALUE,
  HINT_TYPE.CUSTOMER_HINT,
  HINT_TYPE.CUSTOMER_VALUE
];

class AppointmentView extends Component {
  isHintAvailable(hintType) {
    const { hintLevel } = this.props;
    const level = HINT_LEVELS.indexOf(hintType);
    return hintLevel >= level;
  }

  getParticipantDisplay(resource, hintType) {
    const isVisible = this.isHintAvailable(hintType);
    return isVisible ? getParticipantDisplay(resource) : "******";
  }

  renderParticipant(
    resourceType,
    name,
    participant,
    valueHintType,
    hintBadgeType
  ) {
    const resource = findParticipant(resourceType, participant);
    if (!resource) {
      return null;
    }

    const [baseUrl, urlSuffix] = getParticipantUrlParts(resource);
    return (
      <tr>
        <td>{name}</td>
        <td>{this.getParticipantDisplay(resource, valueHintType)}</td>
        <td>
          {
            <Hint
              isVisible={this.isHintAvailable(hintBadgeType)}
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
      HINT_TYPE.CUSTOMER_VALUE,
      HINT_TYPE.CUSTOMER_HINT
    );
  }

  renderPractitioner() {
    const { participant } = this.props;
    return this.renderParticipant(
      RESOURCE_TYPE.Practitioner,
      "Practitioner",
      participant,
      HINT_TYPE.PRACTITIONER_VALUE,
      HINT_TYPE.PRACTITIONER_HINT
    );
  }

  renderLocation() {
    const { participant, onShowDirections } = this.props;
    const location = findParticipant(RESOURCE_TYPE.Location, participant);
    if (!location) {
      return null;
    }

    const isValueVisible = this.isHintAvailable(HINT_TYPE.LOCATION_VALUE);
    const isHintVisible = this.isHintAvailable(HINT_TYPE.LOCATION_HINT);
    const [baseUrl, urlSuffix] = getParticipantUrlParts(location);
    const buttonVisibleClass = isValueVisible ? "visible" : "invisible";

    return (
      <tr>
        <td>Location</td>
        <td>
          {this.getParticipantDisplay(location, HINT_TYPE.LOCATION_VALUE)}
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
      <Hint
        isVisible={this.isHintAvailable(HINT_TYPE.APPOINTMENT_HINT)}
        baseUrl={baseUrl}
        urlSuffix={urlSuffix}
      />
    );
  }

  render() {
    const { hintLevel, onClose, onHintRequested } = this.props;

    return (
      <div className="appointment-guide">
        <div className="my-4">
          <div className="alert alert-info">
            What is the official name of Santa Claus? Where is the appointment?
            Who is the practitioner? Can you find out why Santa Claus is ill?
          </div>
        </div>
        <HintButton
          onHintRequested={onHintRequested}
          isDisabled={hintLevel >= HINT_LEVELS.length - 1}
        />
        <Card
          title={<span>Appointment</span>}
          infoText={this.renderAppointmentHint()}
          actionButtonText="Close"
          onAction={onClose}
        >
          <div className="responsive-table">
            <table className="table text-left">
              <tbody>
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
  onClose: PropTypes.func.isRequired,
  onShowDirections: PropTypes.func.isRequired,
  onHintRequested: PropTypes.func.isRequired
};

export default AppointmentView;
