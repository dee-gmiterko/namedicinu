import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';

import Markdown from "./markdown";

export default class FacultiesComparison extends Component {
  render() {
    const { faculties } = this.props;
    return (
      <Container className="p-3">
        {faculties.edges.map((item, index) => {
          return (
            <>
              <Row>
                <Col md={12}>
                  <h2 id={item.node.title}>{item.node.title}</h2>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Markdown value={item.node.description} />
                </Col>
              </Row>
            </>
          );
        })}
      </Container>
    );
  }
}
