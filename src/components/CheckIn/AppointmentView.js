import React, { Component } from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import Card from "./Card";
import { RESOURCE_TYPE } from "../../constants";

class AppointmentView extends Component {
  findParticipant(resourceType, { participant }) {
    return participant.find(p => p.actor.reference.includes(resourceType));
  }
  renderPatient(appointment) {
    const patient = this.findParticipant(RESOURCE_TYPE.Patient, appointment);
    if (!patient) {
      return null;
    }

    return (
      <tr>
        <td>Customer</td>
        <td>{patient.actor.display}</td>
        <td />
      </tr>
    );
  }

  renderPractitioner(appointment) {
    const practitioner = this.findParticipant(
      RESOURCE_TYPE.Practitioner,
      appointment
    );
    if (!practitioner) {
      return null;
    }

    return (
      <tr>
        <td>Practitioner</td>
        <td>{practitioner.actor.display}</td>
        <td />
      </tr>
    );
  }

  renderLocation(appointment, onShowDirections) {
    const location = this.findParticipant(RESOURCE_TYPE.Location, appointment);
    if (!location) {
      return null;
    }

    return (
      <tr>
        <td>Room</td>
        <td>{location.actor.display}</td>
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
