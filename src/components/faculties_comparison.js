import React, { Component } from "react";
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import Img from "gatsby-image";
import { Link } from "gatsby";
import moment from "moment";

export default class FacultiesComparison extends Component {
  render() {
    const { data } = this.props;
    return (
      <Container className="p-3">
        <Row className="justify-content-center align-items-center">
          <Col md={8}>
            <h2 className="text-black">Faculties comparison</h2>
            <p className="text-black pt-3">
              fermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies
              tristique nulla aliquet enim tortor at auctor urna nunc id cursus metus aliquam
              eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci a
              scelerisque purus semper eget duisfermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies
              tristique nulla aliquet enim tortor at auctor urna nunc id cursus metus aliquam
              eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci a
              scelerisque purus semper eget duisfermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies
              tristique nulla aliquet enim tortor at auctor urna nunc id cursus metus aliquam
              eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci a
              scelerisque purus semper eget duisfermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies
              tristique nulla aliquet enim tortor at auctor urna nunc id cursus metus aliquam
              eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci a
              scelerisque purus semper eget duisfermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies
              tristique nulla aliquet enim tortor at auctor urna nunc id cursus metus aliquam
              eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci a
              scelerisque purus semper eget duis
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}
