import React, { Component } from "react";
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import Img from "gatsby-image";
import { Link } from "gatsby";
import moment from "moment";

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
                  <h2>{item.node.title}</h2>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.node.description.childMarkdownRemark.html
                    }}
                  />
                </Col>
              </Row>
            </>
          );
        })}
      </Container>
    );
  }
}
