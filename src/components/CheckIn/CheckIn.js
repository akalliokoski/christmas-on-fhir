import React, { Component } from "react";
import { Button } from "reactstrap";

export default class CheckIn extends Component {
  render() {
    const { onCheckIn } = this.props;
    return (
      <div>
        <Button color="primary" onClick={onCheckIn}>
          Check-In
        </Button>
      </div>
    );
  }
}
