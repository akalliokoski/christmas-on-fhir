import React, { Component } from "react";
import PropTypes from "prop-types";

import CheckInPrompt from "./CheckInPrompt";
import AppointmentNotFound from "./AppointmentNotFound";
import AppointmentView from "./AppointmentView";
import Map from "../Map/Map";
import MapConfig from "../../config/map";

export const STATUS = {
  CHECK_IN: "CHECK_IN",
  APPOINTMENT_NOT_FOUND: "APPOINTMENT_NOT_FOUND",
  CHECKED_IN: "CHECKED_IN",
  CHECKED_IN_MAP: "CHECKED_IN_MAP"
};

class CheckIn extends Component {
  constructor() {
    super();

    this.STATUS_TO_RENDERER = {
      [STATUS.CHECK_IN]: this.renderCheckIn,
      [STATUS.APPOINTMENT_NOT_FOUND]: this.renderAppointmentNotFound,
      [STATUS.CHECKED_IN]: this.renderAppointment,
      [STATUS.CHECKED_IN_MAP]: this.renderMap
    };
  }

  renderCheckIn = ({ isLoading, onCheckIn }) => (
    <CheckInPrompt isLoading={isLoading} onCheckIn={onCheckIn} />
  );

  renderAppointmentNotFound = ({ onClose }) => (
    <AppointmentNotFound onClose={onClose} />
  );

  renderAppointment = ({ appointment, onClose, onShowMap }) => (
    <AppointmentView
      appointment={appointment}
      onClose={onClose}
      onShowDirections={onShowMap}
    />
  );

  renderMap = ({ room, onClose }) => (
    <Map title={<span>Location</span>} config={MapConfig} onClose={onClose} />
  );

  renderComponent(props) {
    const { status } = props;
    const renderer = this.STATUS_TO_RENDERER[status];
    if (!renderer) {
      throw new Error(`Invalid status ${status}`);
    }

    return renderer(props);
  }

  render() {
    return <div className="App">{this.renderComponent(this.props)}</div>;
  }
}

CheckIn.propTypes = {
  status: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  appointment: PropTypes.object,
  onCheckIn: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onShowMap: PropTypes.func.isRequired
};

export default CheckIn;
