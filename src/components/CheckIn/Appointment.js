import React, { Component } from "react";
import { Card, CardTitle } from "reactstrap";
import PropTypes from "prop-types";

class Appointment extends Component {
  renderPatient(patient) {
    if (!patient) {
      return null;
    }

    return (
      <tr>
        <td>Customer</td>
        <td>
          {patient.lastName}, {patient.firstName}
        </td>
      </tr>
    );
  }

  renderPractitioner(practitioner) {
    if (!practitioner) {
      return null;
    }

    return (
      <tr>
        <td>Practitioner</td>
        <td>
          {practitioner.lastName}, {practitioner.firstName}
        </td>
      </tr>
    );
  }

  renderRoom(room) {
    if (!room) {
      return null;
    }

    return (
      <tr>
        <td>Room</td>
        <td>
          {room.id}, {room.info}
        </td>
      </tr>
    );
  }

  renderTime(appointment) {
    if (!appointment) {
      return null;
    }

    console.log();

    return (
      <tr>
        <td>Time</td>
        <td>{appointment.start.toLocaleString()}</td>
      </tr>
    );
  }

  render() {
    const { room, practitioner, patient, appointment } = this.props;
    return (
      <div className="appointment-guide">
        <Card body className="text-center">
          <CardTitle>Appointment</CardTitle>
          <table className="table">
            <tbody>
              {this.renderPatient(patient)}
              {this.renderTime(appointment)}
              {this.renderPractitioner(practitioner)}
              {this.renderRoom(room)}
            </tbody>
          </table>
        </Card>
      </div>
    );
  }
}

Appointment.propTypes = {
  appointment: PropTypes.object.isRequired,
  patient: PropTypes.object.isRequired,
  practitioner: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired
};

export default Appointment;
