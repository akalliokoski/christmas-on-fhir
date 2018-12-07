import React, { Component } from "react";
import { Button, Card, CardTitle, CardText } from "reactstrap";
import PropTypes from "prop-types";

class PatientNotFound extends Component {
  render() {
    const { patientId, onClose } = this.props;
    return (
      <div>
        <Card body className="text-center">
          <CardTitle>Patient ID "{patientId}" was not found</CardTitle>
          <CardText>Please contact the reception.</CardText>
          <Button
            className="mt-1 btn-block"
            size="lg"
            color="primary"
            onClick={onClose}
          >
            Close
          </Button>
        </Card>
      </div>
    );
  }
}

PatientNotFound.propTypes = {
  patientId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default PatientNotFound;
