import React, { Component } from "react";
import CheckIn from "./components/CheckIn/CheckIn";
import AppointmentNotFound from "./components/CheckIn/AppointmentNotFound";
import Appointment from "./components/CheckIn/Appointment";
import Map from "./components/Map/Map";
import {
  getAppointment,
  getPatient,
  getPractitioner,
  getRoom
} from "./services/fhir";
import MapConfig from "./config/map";

const STATUS = {
  CHECK_IN: "CHECK_IN",
  APPOINTMENT_NOT_FOUND: "APPOINTMENT_NOT_FOUND",
  CHECKED_IN: "CHECKED_IN",
  CHECKED_IN_MAP: "CHECKED_IN_MAP"
};

const initialState = {
  status: STATUS.CHECK_IN,
  isLoading: false,
  patientId: null,
  patient: null,
  appointment: null,
  room: null,
  practitioner: null,
  showDirections: false
};

class App extends Component {
  constructor() {
    super();

    this.STATUS_TO_RENDERER = {
      [STATUS.CHECK_IN]: this.renderCheckIn,
      [STATUS.APPOINTMENT_NOT_FOUND]: this.renderAppointmentNotFound,
      [STATUS.CHECKED_IN]: this.renderAppointment,
      [STATUS.CHECKED_IN_MAP]: this.renderMap
    };
  }

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

  reset = () => {
    this.setState(initialState);
  };

  showDirections = () => {
    this.setState({ status: STATUS.CHECKED_IN_MAP });
  };

  renderCheckIn = () => <CheckIn onCheckIn={this.handleCheckIn} />;

  renderAppointmentNotFound = () => (
    <AppointmentNotFound onClose={this.reset} />
  );

  renderAppointment = ({ appointment, patient, practitioner, room }) => (
    <Appointment
      appointment={appointment}
      patient={patient}
      practitioner={practitioner}
      room={room}
      onClose={this.reset}
      onShowDirections={this.showDirections}
    />
  );

  renderMap = ({ room }) => (
    <Map
      title={<span>Room {room.id}</span>}
      config={MapConfig}
      routeId={room.id}
      onClose={this.reset}
    />
  );

  renderComponent(state) {
    const { status } = state;
    const renderer = this.STATUS_TO_RENDERER[status];
    if (!renderer) {
      throw new Error(`Invalid status ${status}`);
    }

    return renderer(state);
  }

  render() {
    return <div className="App">{this.renderComponent(this.state)}</div>;
  }
}

export default App;
