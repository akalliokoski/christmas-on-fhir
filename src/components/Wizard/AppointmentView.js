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
  getParticipantUrl,
  getResourceUrl
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
  HINT_TYPE.LOCATION_HINT,
  HINT_TYPE.LOCATION_VALUE,
  HINT_TYPE.PRACTITIONER_HINT,
  HINT_TYPE.PRACTITIONER_VALUE,
  HINT_TYPE.CUSTOMER_HINT,
  HINT_TYPE.CUSTOMER_VALUE,
  HINT_TYPE.APPOINTMENT_HINT
];

class AppointmentView extends Component {
  isHintAvailable(hintType) {
    const { hintLevel } = this.props;
    const level = HINT_LEVELS.indexOf(hintType);
    return hintLevel >= level;
  }

  getParticipantDisplay(participant, hintType) {
    const isVisible = this.isHintAvailable(hintType);
    return isVisible ? getParticipantDisplay(participant) : "******";
  }

  renderParticipant(
    resourceType,
    name,
    appointment,
    valueHintType,
    hintBadgeType
  ) {
    const participant = findParticipant(resourceType, appointment);
    if (!participant) {
      return null;
    }

    return (
      <tr>
        <td>{name}</td>
        <td>{this.getParticipantDisplay(participant, valueHintType)}</td>
        <td>
          {
            <Hint
              isVisible={this.isHintAvailable(hintBadgeType)}
              url={getParticipantUrl(participant)}
            />
          }
        </td>
      </tr>
    );
  }

  renderPatient(appointment) {
    return this.renderParticipant(
      RESOURCE_TYPE.Patient,
      "Customer",
      appointment,
      HINT_TYPE.CUSTOMER_VALUE,
      HINT_TYPE.CUSTOMER_HINT
    );
  }

  renderPractitioner(appointment) {
    return this.renderParticipant(
      RESOURCE_TYPE.Practitioner,
      "Practitioner",
      appointment,
      HINT_TYPE.PRACTITIONER_VALUE,
      HINT_TYPE.PRACTITIONER_HINT
    );
  }

  renderLocation(appointment, onShowDirections) {
    const location = findParticipant(RESOURCE_TYPE.Location, appointment);
    if (!location) {
      return null;
    }

    const showHint = this.isHintAvailable(HINT_TYPE.LOCATION_HINT);
    return (
      <tr>
        <td>Location</td>
        <td>
          {this.getParticipantDisplay(location, HINT_TYPE.LOCATION_VALUE)}
        </td>
        <td>
          <Button
            className={showHint ? "visible" : "invisible"}
            size="sm"
            color="info"
            onClick={onShowDirections}
          >
            Map
          </Button>
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

  render() {
    const {
      appointment,
      hintLevel,
      onClose,
      onShowDirections,
      onHintRequested
    } = this.props;
    return (
      <div className="appointment-guide">
        <div className="my-4">
          <div className="alert alert-info">
            Where is the appointment? Who is the practitioner? Can you find out
            why Santa Claus is ill?
          </div>
        </div>
        <HintButton
          onHintRequested={onHintRequested}
          isDisabled={hintLevel >= HINT_LEVELS.length}
        />
        <Card
          title={<span>Appointment</span>}
          infoText={
            <span>
              {appointment ? (
                <Hint
                  isVisible={hintLevel > 3}
                  url={getResourceUrl(
                    RESOURCE_TYPE.Appointment,
                    appointment.id
                  )}
                />
              ) : null}
            </span>
          }
          actionButtonText="Close"
          onAction={onClose}
        >
          <div className="responsive-table">
            <table className="table text-left">
              <tbody>
                {this.renderPatient(appointment)}
                {this.renderTime(appointment)}
                {this.renderPractitioner(appointment)}
                {this.renderLocation(appointment, onShowDirections)}
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
  hintLevel: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  onShowDirections: PropTypes.func.isRequired,
  onHintRequested: PropTypes.func.isRequired
};

export default AppointmentView;
