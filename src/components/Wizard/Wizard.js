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

class Wizard extends Component {
  constructor() {
    super();

    this.STATUS_TO_RENDERER = {
      [STATUS.CHECK_IN]: this.renderCheckIn,
      [STATUS.APPOINTMENT_NOT_FOUND]: this.renderAppointmentNotFound,
      [STATUS.CHECKED_IN]: this.renderAppointment,
      [STATUS.CHECKED_IN_MAP]: this.renderMap
    };
  }

  handleCheckIn = patientIdentifier => {
    this.setState({ hintLevel: 0 });

    const { onCheckIn } = this.props;
    onCheckIn(patientIdentifier);
  };

  handleClose = () => {
    this.setState({ hintLevel: 0 });
    const { onClose } = this.props;
    onClose();
  };

  renderCheckIn = () => {
    const { hintLevel, hints, isLoading, onHintLevelChange } = this.props;
    return (
      <CheckInPrompt
        isLoading={isLoading}
        hintLevel={hintLevel}
        hints={hints}
        onCheckIn={this.handleCheckIn}
        onHintLevelChange={onHintLevelChange}
      />
    );
  };

  renderAppointmentNotFound = () => (
    <AppointmentNotFound onClose={this.handleClose} />
  );

  renderAppointment = () => {
    const {
      hintLevel,
      hints,
      appointment,
      participant,
      onShowMap,
      onHintLevelChange
    } = this.props;

    return (
      <AppointmentView
        appointment={appointment}
        participant={participant}
        hintLevel={hintLevel}
        hints={hints}
        onClose={this.handleClose}
        onShowDirections={onShowMap}
        onHintLevelChange={onHintLevelChange}
      />
    );
  };

  renderMap = () => {
    const { onCloseMap } = this.props;
    return (
      <div>
        <div className="my-4">
          <div className="alert alert-info">
            Did you know that Santa Claus' original home lies in the mysterious
            Korvatunturi, in Finland? Of course, the exact location is a secret
            only known to a chosen few.
          </div>
        </div>
        <Map
          title={<span>Location</span>}
          config={MapConfig}
          onBack={onCloseMap}
        />
      </div>
    );
  };

  renderComponent() {
    const { status } = this.props;
    const renderer = this.STATUS_TO_RENDERER[status];
    if (!renderer) {
      throw new Error(`Invalid status ${status}`);
    }

    return renderer();
  }

  render() {
    return <div>{this.renderComponent()}</div>;
  }
}

Wizard.propTypes = {
  status: PropTypes.string.isRequired,
  hintLevel: PropTypes.number.isRequired,
  hints: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  appointment: PropTypes.object,
  participant: PropTypes.array,
  onCheckIn: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onShowMap: PropTypes.func.isRequired,
  onCloseMap: PropTypes.func.isRequired,
  onHintLevelChange: PropTypes.func.isRequired
};

export default Wizard;
