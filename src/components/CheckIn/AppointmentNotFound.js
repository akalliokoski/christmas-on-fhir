import React, { Component } from "react";
import { Button, Card, CardTitle, CardText } from "reactstrap";
import PropTypes from "prop-types";

class AppointmentNotFound extends Component {
  render() {
    const { onClose } = this.props;
    return (
      <div>
        <Card body className="text-center">
          <CardTitle>Appointment was not found</CardTitle>
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

AppointmentNotFound.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default AppointmentNotFound;
