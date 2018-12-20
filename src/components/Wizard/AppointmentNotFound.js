import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "./Card";

class AppointmentNotFound extends Component {
  render() {
    const { onClose } = this.props;
    return (
      <div>
        <div className="my-4">
          <div className="alert alert-primary">
            <strong>Only Santa Claus can be checked in!</strong> But what is his
            identifier?
          </div>
        </div>
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
