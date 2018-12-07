import React, { Component } from "react";
import {
  Button,
  Card,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Input
} from "reactstrap";
import PropTypes from "prop-types";

const getPatient = id => {
  const parsed = Number(id);
  if (isNaN(parsed)) {
    return null;
  }

  return { id };
};

class CheckIn extends Component {
  state = { id: "" };

  onSubmit = e => {
    e.preventDefault();

    const { onPatientNotFound, onCheckIn } = this.props;
    const { id } = this.state;

    const patient = getPatient(id);
    if (!patient) {
      onPatientNotFound(id);
    }

    onCheckIn(patient);
  };

  handleIdChange = event => {
    this.setState({ id: event.target.value });
  };

  render() {
    return (
      <div>
        <Card body className="text-center">
          <CardTitle>Check-In</CardTitle>
          <CardText>Please type your ID</CardText>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Input
                bsSize="lg"
                value={this.state.id}
                onChange={this.handleIdChange}
              />
              <Button
                className="mt-1 btn-block"
                size="lg"
                color="primary"
                type="submit"
              >
                Check-In
              </Button>
            </FormGroup>
          </Form>
        </Card>
      </div>
    );
  }
}

CheckIn.propTypes = {
  onPatientNotFound: PropTypes.func.isRequired,
  onCheckIn: PropTypes.func.isRequired
};

export default CheckIn;
