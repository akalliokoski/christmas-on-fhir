import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

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
  state = { hintLevel: 0 };

  constructor() {
    super();

    this.STATUS_TO_RENDERER = {
      [STATUS.CHECK_IN]: this.renderCheckIn,
      [STATUS.APPOINTMENT_NOT_FOUND]: this.renderAppointmentNotFound,
      [STATUS.CHECKED_IN]: this.renderAppointment,
      [STATUS.CHECKED_IN_MAP]: this.renderMap
    };
  }

  handleHint = () => {
    const { hintLevel } = this.state;
    this.setState({ hintLevel: hintLevel + 1 });
  };

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

  renderDescription() {
    return (
      <div>
        <div>What's the matter, Santa?</div>
        <div>
          Can you help Santa Claus to check-in for an appointment? Do you know
          your FHIR? What about GDPR?
        </div>
        <Button
          className="mt-1"
          size="sm"
          color="info"
          onClick={this.handleHint}
        >
          Hint!
        </Button>
      </div>
    );
  }

  renderCheckIn = () => {
    const { isLoading } = this.props;
    const { hintLevel } = this.state;
    return (
      <CheckInPrompt
        isLoading={isLoading}
        hintLevel={hintLevel}
        onCheckIn={this.handleCheckIn}
      />
    );
  };

  renderAppointmentNotFound = () => (
    <AppointmentNotFound onClose={this.handleClose} />
  );

  renderAppointment = () => {
    const { appointment, onShowMap } = this.props;
    const { hintLevel } = this.state;
    return (
      <AppointmentView
        appointment={appointment}
        hintLevel={hintLevel}
        onClose={this.handleClose}
        onShowDirections={onShowMap}
      />
    );
  };

  renderMap = () => {
    const { onCloseMap } = this.props;
    return (
      <Map
        title={<span>Location</span>}
        infoText={
          <span>
            Did you know that Santa Claus' original home lies in the mysterious
            Korvatunturi, Finland? Of course, the exact location is a secret
            only known to a chosen few
          </span>
        }
        config={MapConfig}
        onBack={onCloseMap}
      />
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
    return (
      <div>
        {this.renderDescription()}
        {this.renderComponent()}
      </div>
    );
  }
}

CheckIn.propTypes = {
  status: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  appointment: PropTypes.object,
  onCheckIn: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onShowMap: PropTypes.func.isRequired,
  onCloseMap: PropTypes.func.isRequired
};

export default CheckIn;
