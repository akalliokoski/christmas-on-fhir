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

class AppointmentView extends Component {
  renderParticipant(resourceType, name, appointment, showHint) {
    const participant = findParticipant(resourceType, appointment);
    if (!participant) {
      return null;
    }

    return (
      <tr>
        <td>{name}</td>
        <td>{getParticipantDisplay(participant)}</td>
        <td>
          {<Hint isVisible={showHint} url={getParticipantUrl(participant)} />}
        </td>
      </tr>
    );
  }

  renderPatient(appointment, showHint) {
    return this.renderParticipant(
      RESOURCE_TYPE.Patient,
      "Customer",
      appointment,
      showHint
    );
  }

  renderPractitioner(appointment, showHint) {
    return this.renderParticipant(
      RESOURCE_TYPE.Practitioner,
      "Practitioner",
      appointment,
      showHint
    );
  }

  renderLocation(appointment, showHint, onShowDirections) {
    const location = findParticipant(RESOURCE_TYPE.Location, appointment);
    if (!location) {
      return null;
    }

    return (
      <tr>
        <td>Location</td>
        <td>{getParticipantDisplay(location)}</td>
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
          <div class="alert alert-info">
            Where is the appointment? Who is the practitioner? Can you find out
            why Santa Claus is ill?
          </div>
        </div>
        <HintButton
          onHintRequested={onHintRequested}
          isDisabled={hintLevel >= 4}
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
                {this.renderPatient(appointment, hintLevel > 2)}
                {this.renderTime(appointment)}
                {this.renderPractitioner(appointment, hintLevel > 1)}
                {this.renderLocation(
                  appointment,
                  hintLevel > 0,
                  onShowDirections
                )}
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
