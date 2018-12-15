import React, { Component } from "react";
import CheckIn, { STATUS } from "./components/CheckIn/CheckIn";
import { getAppointment } from "./services/fhir";

const initialState = {
  status: STATUS.CHECK_IN,
  isLoading: false,
  appointment: null
};

class App extends Component {
  state = initialState;

  handleCheckIn = async patientIdentifier => {
    this.setState({ isLoading: true });

    const appointment = await getAppointment(patientIdentifier);

    this.setState({
      status: appointment ? STATUS.CHECKED_IN : STATUS.APPOINTMENT_NOT_FOUND,
      appointment,
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
      <div className="App cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <div className="cover">
          <CheckIn
            className="lead"
            {...this.state}
            onCheckIn={this.handleCheckIn}
            onClose={this.reset}
            onShowMap={this.handleShowMap}
          />
        </div>
      </div>
    );
  }
}

export default App;
