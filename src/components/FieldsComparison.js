import React, { Component } from "react";
import { Container } from "react-bootstrap";
import FieldDetail from "./FieldDetail";
import VisibilitySensor from "react-visibility-sensor";

export default class FieldsComparison extends Component {
  render() {
    const { fields, setVisibleIndex } = this.props;

    return (
      <Container className="faculties-comparison">
        {fields.map((field, index) => {
          return (
            <VisibilitySensor
              onChange={() => setVisibleIndex(index)}
              partialVisibility={true}
              key={index}
            >
              <div>
                <FieldDetail field={field} />
              </div>
            </VisibilitySensor>
          );
        })}
      </Container>
    );
  }
}
