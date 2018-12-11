import React, { Component } from "react";
import CheckIn, { STATUS } from "./components/CheckIn/CheckIn";
import {
  getAppointment,
  getPatient,
  getPractitioner,
  getRoom
} from "./services/fhir";

const initialState = {
  status: STATUS.CHECK_IN,
  isLoading: false,
  patient: null,
  appointment: null,
  room: null,
  practitioner: null
};

class App extends Component {
  state = initialState;

  handleCheckIn = async id => {
    this.setState({ isLoading: true });

    const patient = await getPatient(id);
    const appointment = await getAppointment(patient);
    const practitioner = await getPractitioner(appointment);
    const room = await getRoom(appointment);

    this.setState({
      status: appointment ? STATUS.CHECKED_IN : STATUS.APPOINTMENT_NOT_FOUND,
      patient,
      appointment,
      practitioner,
      room,
      isLoading: false
    });
  };

  handleShowMap = () => {
    this.setState({ status: STATUS.CHECKED_IN_MAP });
  };

  reset = () => {
    this.setState(initialState);
  };

  render() {
    return (
      <div className="App">
        <CheckIn
          {...this.state}
          onCheckIn={this.handleCheckIn}
          onClose={this.reset}
          onShowMap={this.handleShowMap}
        />
      </div>
    );
  }
}

export default App;
