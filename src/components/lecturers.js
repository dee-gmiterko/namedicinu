import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Img from "gatsby-image";

import Markdown from "./markdown";

export default class Lecturers extends Component {
  render() {
    const { site, lecturers } = this.props;
    return (
      <Container className="p-3">
        <Row>
          <Col md={12} className="p-3">
            <h2 id="Lecturers">Lecturers</h2>
            <Markdown value={site.lecturersDescription} />
          </Col>
        </Row>
        {lecturers.edges.map((item, index) => {
          const photo_col = (
            <Col md={4} style={{padding: "0 6%"}}>
              <div className="square">
                <Img
                  fluid={item.node.photo.fluid}
                  objectFit="cover"
                  objectPosition="50% 50%"
                  style={{
                    borderRadius: "50%",
                    border: "15px solid white",
                    boxShadow: "0 0 15px rgba(0, 0, 0, 0.06)",
                  }}
                />
              </div>
            </Col>
          )
          return (
            <Row className="p-3">
              {index % 2 === 0 && photo_col}
              <Col md={8}>
                <h3>
                  {item.node.name}
                </h3>
                {
                  item.node.designation &&
                  <p>{item.node.designation}</p>
                }
                <Markdown value={item.node.description} />
              </Col>
              {index % 2 === 1 && photo_col}
            </Row>
          );
        })}
      </Container>
    );
  }
}
