import React, { Component } from "react";
import { Link } from "gatsby";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import Markdown from "./markdown";

export default class Register extends Component {
  render() {
    const { site, faculties } = this.props;
    return (
      <Container className="p-3">
        <Row className="justify-content-center align-items-center">
          <Col md={12} className="p-3">
            <h2 className="text-black" id="Register">Register</h2>
            <Markdown value={site.registerDescription} />
          </Col>
        </Row>
        <Row>
          <Col md={12} className="p-3">
            <Form> {/* TODO add https://formspree.io/ */}
              <Form.Group controlId="registerEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Email" />
              </Form.Group>

              <Form.Group controlId="registerName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="input" placeholder="Name" />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="registerPreferenceTime">
                  <Form.Label>Preferovany cas</Form.Label>
                  <Form.Control as="select">
                    <option value=""></option>
                    <option value="doobedu">doobedu</option>
                    <option value="vecer">vecer</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="registerPreferenceDay">
                  <Form.Label>Den</Form.Label>
                  <Form.Control as="select">
                    <option value=""></option>
                    <option value="prac den">prac den</option>
                    <option value="vikend">vikend</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="registerFaculty">
                <Form.Label>Chcem prípravu na fakltu</Form.Label>
                <Link to={`/faculties/#Faculties`} class="float-right">Potrebuješ pomoc s výberom fakulty?</Link>
                <Form.Control as="select">
                  <option value=""></option>
                  {faculties.edges.map((item, index) => {
                    return (
                      <option value={item.node.title}>{item.node.title}</option>
                    );
                  })}
                </Form.Control>
              </Form.Group>

              <Form.Row>
                <Col md={12} className="text-justify">
                  <Form.Text>
                    <Markdown value={site.registerConsent} />
                  </Form.Text>
                </Col>
                <Col md={12} className="text-center">
                  <Button variant="primary" type="submit" size="lg">
                    Submit
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
