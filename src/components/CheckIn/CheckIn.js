import React, { Component } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import PropTypes from "prop-types";
import Card from "./Card";

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
    const { id } = this.state;
    return (
      <div className="check-in">
        <Card
          title={<span>Check-in</span>}
          infoText={<span>Please type your ID</span>}
        >
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Input
                bsSize="lg"
                value={id}
                onChange={this.handleIdChange}
                className="text-center"
              />
              <Button
                className="mt-1 btn-block"
                size="lg"
                color="primary"
                type="submit"
                disabled={!id}
              >
                Check in
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
