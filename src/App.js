import React, { Component } from "react";
import Wizard, { STATUS } from "./components/Wizard/Wizard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getAppointment, getParticipant } from "./services/fhir";
import { validateResources } from "./utils/fhirUtils";
import { SECRET_IDENTIFIER } from "./constants";

const initialState = {
  status: STATUS.CHECK_IN,
  hintLevel: 0,
  hints: {},
  isLoading: false,
  appointment: null,
  participant: [],
  areResourcesValid: true
};

class App extends Component {
  state = initialState;

  async componentDidMount() {
    const appointment = await getAppointment(SECRET_IDENTIFIER);
    const participant = await getParticipant(appointment);
    const areResourcesValid = validateResources(appointment, participant);
    this.setState({ areResourcesValid });
  }

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
    const { status, areResourcesValid } = this.state;
    const newState =
      status === STATUS.APPOINTMENT_NOT_FOUND
        ? { status: STATUS.CHECK_IN, isLoading: false }
        : initialState;
    newState.areResourcesValid = areResourcesValid;
    this.setState(newState);
  };

  renderInvalidResourcesAlert() {
    const { areResourcesValid } = this.state;
    if (areResourcesValid) {
      return null;
    }

    return (
      <div className="alert alert-warning show mt-4" role="alert">
        <strong>
          Test resources on FHIR test server have removed or modified!
        </strong>{" "}
        You can play around with the app but it will no longer work as expected.
      </div>
    );
  }

  render() {
    return (
      <div className="App cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <Header />
        <div className="cover">
          {this.renderInvalidResourcesAlert()}
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
