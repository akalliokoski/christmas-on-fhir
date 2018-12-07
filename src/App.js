import React, { Component } from "react";
import CheckIn from "./components/CheckIn/CheckIn";
import PatientNotFound from "./components/CheckIn/PatientNotFound";
import Guide from "./components/Guide/Guide";

const initialState = {
  patient: null,
  patientId: null
};

class App extends Component {
  state = initialState;

  handlePatientNotFound = id => {
    this.setState({ patientId: id, patient: null });
  };

  handleCheckIn = () => {
    this.setState({ checkedIn: true });
  };

  reset = () => {
    this.setState(initialState);
  };

  renderComponent() {
    const { patientId, patient } = this.state;
    if (!patientId && !patient) {
      return (
        <CheckIn
          onCheckIn={this.handleCheckIn}
          onPatientNotFound={this.handlePatientNotFound}
        />
      );
    }

    if (!patient) {
      return <PatientNotFound patientId={patientId} onClose={this.reset} />;
    }

    return <Guide />;
  }

  render() {
    return <div className="App">{this.renderComponent()}</div>;
  }
}

export default App;
