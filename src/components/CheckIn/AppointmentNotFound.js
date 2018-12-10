import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "./Card";

class AppointmentNotFound extends Component {
  render() {
    const { onClose } = this.props;
    return (
      <div>
        <Card
          title={<span>Appointment was not found</span>}
          infoText={<span>Please contact the reception.</span>}
          actionButtonText="Close"
          onAction={onClose}
        />
      </div>
    );
  }
}

AppointmentNotFound.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default AppointmentNotFound;
