import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "./Card";

class PatientNotFound extends Component {
  render() {
    const { patientId, onClose } = this.props;
    return (
      <div>
        <Card
          title={<span>Patient ID {patientId} was not found</span>}
          infoText={<span>Please contact the reception.</span>}
          actionButtonText="Close"
          onAction={onClose}
        />
      </div>
    );
  }
}

PatientNotFound.propTypes = {
  patientId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default PatientNotFound;
