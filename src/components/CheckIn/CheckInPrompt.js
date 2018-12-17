import React, { Component } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import PropTypes from "prop-types";
import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { SECRET_IDENTIFIER } from "../../constants";

class CheckInPrompt extends Component {
  state = { id: "" };

  handleSubmit = e => {
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

  renderCard(id, hintLevel, isLoading) {
    const placeholder = hintLevel > 0 ? SECRET_IDENTIFIER : "";
    console.log(hintLevel);
    return (
      <Card
        title={<span>Check-in</span>}
        infoText={<span>Please type your ID</span>}
      >
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Input
              bsSize="lg"
              value={id}
              onChange={this.handleIdChange}
              className="text-center"
              placeholder={placeholder}
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
    );
  }

  render() {
    const { id } = this.state;
    const { isLoading, hintLevel } = this.props;
    return (
      <div className="check-in">
        {this.renderCard(id, hintLevel, isLoading)}
      </div>
    );
  }
}

CheckInPrompt.propTypes = {
  hintLevel: PropTypes.number,
  onCheckIn: PropTypes.func.isRequired
};

export default CheckInPrompt;
