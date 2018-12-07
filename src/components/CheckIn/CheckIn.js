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

export default class CheckIn extends Component {
  onSubmit = e => {
    e.preventDefault();
    const { onCheckIn } = this.props;
    onCheckIn();
  };

  render() {
    return (
      <div>
        <Card body className="text-center">
          <CardTitle>Check-In</CardTitle>
          <CardText>Please type your ID</CardText>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Input bsSize="lg" />
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
