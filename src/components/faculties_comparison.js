import React, { Component } from "react";
import { Container } from 'react-bootstrap';
import VisibilitySensor from 'react-visibility-sensor';

import FacultiesDetail from "./faculties_detail";

export default class FacultiesComparison extends Component {
  render() {
    const { faculties, setVisibleIndex } = this.props;

    return (
      <Container className="faculties-comparison">
        {faculties.edges.map((item, index) => {
          return (
            <VisibilitySensor onChange={setVisibleIndex.bind(null, index)} partialVisibility={true} key={index}>
              <div>
                <FacultiesDetail faculty={item} />
              </div>
            </VisibilitySensor>
          );
        })}
      </Container>
    );
  }
}
