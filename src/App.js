import React, { Component } from "react";
import CheckIn from "./components/CheckIn/CheckIn";
import PatientNotFound from "./components/CheckIn/PatientNotFound";
import AppointmentNotFound from "./components/CheckIn/AppointmentNotFound";
import Appointment from "./components/CheckIn/Appointment";
import { getPatient } from "./services/patient";
import {
  getAppointment,
  getPractitioner,
  getRoom
} from "./services/appointment";

const initialState = {
  patientId: null,
  patient: null,
  appointment: null
};

class App extends Component {
  state = initialState;

  handleCheckIn = id => {
    const patient = getPatient(id);
    const appointment = patient ? getAppointment(patient) : null;
    this.setState({ patient, appointment });
  };

  reset = () => {
    this.setState(initialState);
  };

  renderComponent() {
    const { patientId, patient, appointment } = this.state;
    if (!patientId && !patient) {
      return <CheckIn onCheckIn={this.handleCheckIn} />;
    }

    if (!patient) {
      return <PatientNotFound patientId={patientId} onClose={this.reset} />;
    }

    if (!appointment) {
      return <AppointmentNotFound onClose={this.reset} />;
    }

    const practitioner = getPractitioner(appointment);
    const room = getRoom(appointment);
    return (
      <Appointment
        appointment={appointment}
        patient={patient}
        practitioner={practitioner}
        room={room}
      />
    );
  }

  render() {
    return <div className="App">{this.renderComponent()}</div>;
  }
}

export default App;
