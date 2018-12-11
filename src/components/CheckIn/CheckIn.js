import React, { Component } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import PropTypes from "prop-types";
import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

class CheckIn extends Component {
  state = { id: "" };

  onSubmit = e => {
    e.preventDefault();

    const { isLoading, onCheckIn } = this.props;
    if (isLoading) {
      return;
    }

    const { id } = this.state;
    onCheckIn(id);
  };

  handleIdChange = event => {
    this.setState({ id: event.target.value });
  };

  render() {
    const { id } = this.state;
    const { isLoading } = this.props;
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
              <button
                className="btn btn-primary btn-lg mt-1 btn-block"
                type="submit"
                disabled={!id}
              >
                {isLoading ? (
                  <FontAwesomeIcon icon={faCircleNotch} spin />
                ) : (
                  "Check in"
                )}
              </button>
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
