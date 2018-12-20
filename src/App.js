import React, { Component } from "react";
import Wizard, { STATUS } from "./components/Wizard/Wizard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getAppointment, getParticipant } from "./services/fhir";
import { SECRET_IDENTIFIER } from "./constants";

const initialState = {
  status: STATUS.CHECK_IN,
  hintLevel: 0,
  hints: {},
  isLoading: false,
  appointment: null,
  participant: []
};

class App extends Component {
  state = initialState;

  handleCheckIn = async patientIdentifier => {
    this.setState({ isLoading: true });

    const appointment =
      patientIdentifier === SECRET_IDENTIFIER
        ? await getAppointment(patientIdentifier)
        : null;
    const participant = await getParticipant(appointment);
    const newStatus = appointment
      ? STATUS.CHECKED_IN
      : STATUS.APPOINTMENT_NOT_FOUND;

    this.setState({
      status: newStatus,
      hintLevel: newStatus === STATUS.CHECKED_IN ? 0 : this.state.hintLevel,
      hints: newStatus === STATUS.CHECKED_IN ? {} : this.state.hints,
      appointment,
      participant,
      isLoading: false
    });
  };

  handleShowMap = () => {
    this.setState({ status: STATUS.CHECKED_IN_MAP });
  };

  handleCloseMap = () => {
    this.setState({ status: STATUS.CHECKED_IN });
  };

  handleHintLevelChange = (hintLevel, hints) => {
    this.setState({ hintLevel, hints });
  };

  handleClose = () => {
    const { status } = this.state;
    const newState =
      status === STATUS.APPOINTMENT_NOT_FOUND
        ? { status: STATUS.CHECK_IN, isLoading: false }
        : initialState;
    this.setState(newState);
  };

  render() {
    return (
      <div className="App cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <Header />
        <div className="cover">
          <Wizard
            className="lead"
            {...this.state}
            onCheckIn={this.handleCheckIn}
            onClose={this.handleClose}
            onShowMap={this.handleShowMap}
            onCloseMap={this.handleCloseMap}
            onHintLevelChange={this.handleHintLevelChange}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
