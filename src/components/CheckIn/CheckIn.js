import React, { Component } from "react";

export default class CheckIn extends Component {
  render() {
    const { onCheckIn } = this.props;
    return (
      <div>
        <button className="btn primary-button" onClick={onCheckIn}>
          Check-In
        </button>
      </div>
    );
  }
}
