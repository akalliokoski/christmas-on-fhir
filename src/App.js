import React, { Component } from "react";
import CheckIn from "./components/CheckIn/CheckIn";
import PatientNotFound from "./components/CheckIn/PatientNotFound";
import AppointmentNotFound from "./components/CheckIn/AppointmentNotFound";
import Guide from "./components/Guide/Guide";
import { getPatient } from "./services/patient";
import { getAppointment } from "./services/appointment";
import GuideConfiguration from "./config/guide";

const initialState = {
  patientId: null,
  patient: null,
  appointment: null,
  room: null
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

    return <Guide config={GuideConfiguration} routeId={appointment.roomId} />;
  }

  render() {
    return <div className="App">{this.renderComponent()}</div>;
  }
}

export default App;
