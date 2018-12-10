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

class CheckIn extends Component {
  state = { id: "" };

  onSubmit = e => {
    e.preventDefault();

    const { onCheckIn } = this.props;
    const { id } = this.state;
    onCheckIn(id);
  };

  handleIdChange = event => {
    this.setState({ id: event.target.value });
  };

  render() {
    return (
      <div className="check-in">
        <Card body className="text-center">
          <CardTitle>Check-In</CardTitle>
          <CardText>Please type your ID</CardText>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Input
                bsSize="lg"
                value={this.state.id}
                onChange={this.handleIdChange}
                className="text-center"
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
  onCheckIn: PropTypes.func.isRequired
};

export default CheckIn;
