import React, { Component } from "react";
import CheckIn from "./components/CheckIn/CheckIn";
import PatientNotFound from "./components/CheckIn/PatientNotFound";
import AppointmentNotFound from "./components/CheckIn/AppointmentNotFound";
import Appointment from "./components/CheckIn/Appointment";
import Guide from "./components/Guide/Guide";
import { getPatient } from "./services/patient";
import {
  getAppointment,
  getPractitioner,
  getRoom
} from "./services/appointment";
import GuideConfiguration from "./config/guide";

const initialState = {
  patientId: null,
  patient: null,
  appointment: null,
  showDirections: false
};

class App extends Component {
  state = initialState;

  handleCheckIn = id => {
    const patient = getPatient(id);
    const appointment = patient ? getAppointment(patient) : null;
    this.setState({ patientId: id, patient, appointment });
  };

  reset = () => {
    this.setState(initialState);
  };

  showDirections = () => {
    this.setState({ showDirections: true });
  };

  renderComponent() {
    const { patientId, patient, appointment, showDirections } = this.state;
    if (!patientId && !patient) {
      return <CheckIn onCheckIn={this.handleCheckIn} />;
    }

    if (!patient) {
      return <PatientNotFound patientId={patientId} onClose={this.reset} />;
    }

    if (!appointment) {
      return <AppointmentNotFound onClose={this.reset} />;
    }

    const room = getRoom(appointment);
    if (showDirections && room) {
      return (
        <Guide config={GuideConfiguration} routeId={room.id}>
          {" "}
        </Guide>
      );
    }

    const practitioner = getPractitioner(appointment);

    return (
      <Appointment
        appointment={appointment}
        patient={patient}
        practitioner={practitioner}
        room={room}
        onClose={this.reset}
        onShowDirections={this.showDirections}
      />
    );
  }

  render() {
    return <div className="App">{this.renderComponent()}</div>;
  }
}

export default App;
