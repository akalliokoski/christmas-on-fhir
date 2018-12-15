import React, { Component } from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import Card from "./Card";
import { RESOURCE_TYPE } from "../../constants";
import {
  findParticipant,
  getParticipantDisplay,
  getParticipantUrl
} from "../../utils/fhirUtils";

class AppointmentView extends Component {
  renderParticipant(resourceType, name, appointment) {
    const participant = findParticipant(resourceType, appointment);
    if (!participant) {
      return null;
    }

    return (
      <tr>
        <td>{name}</td>
        <td>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={getParticipantUrl(participant)}
          >
            {getParticipantDisplay(participant)}
          </a>
        </td>
        <td />
      </tr>
    );
  }

  renderPatient(appointment) {
    return this.renderParticipant(
      RESOURCE_TYPE.Patient,
      "Customer",
      appointment
    );
  }

  renderPractitioner(appointment) {
    return this.renderParticipant(
      RESOURCE_TYPE.Practitioner,
      "Practitioner",
      appointment
    );
  }

  renderLocation(appointment, onShowDirections) {
    const location = findParticipant(RESOURCE_TYPE.Location, appointment);
    if (!location) {
      return null;
    }

    return (
      <tr>
        <td>Room</td>
        <td>{getParticipantDisplay(location)}</td>
        <td>
          <Button
            className=""
            size="sm"
            color="info"
            onClick={onShowDirections}
          >
            Show on Map
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
    const { appointment, onClose, onShowDirections } = this.props;
    return (
      <div className="appointment-guide">
        <Card
          title={<span>Appointment</span>}
          actionButtonText="Close"
          onAction={onClose}
        >
          <table className="table text-left">
            <tbody>
              {this.renderPatient(appointment)}
              {this.renderTime(appointment)}
              {this.renderPractitioner(appointment)}
              {this.renderLocation(appointment, onShowDirections)}
            </tbody>
          </table>
        </Card>
      </div>
    );
  }
}

AppointmentView.propTypes = {
  appointment: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onShowDirections: PropTypes.func.isRequired
};

export default AppointmentView;
