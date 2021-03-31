import React, { Component } from "react";
import { Link } from "gatsby";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import Markdown from "./markdown";

export default class Register extends Component {
  render() {
    const { site, faculties } = this.props;
    return (
      <div className="d-flex flex-row register">
        <div className="flex-grow-1" />
        <Container id="Register">
          <Row>
            <Col md={5} className="pt-5 pr-5 text-justify">
              <h2>
                <FormattedMessage id="title.register" defaultMessage="Register" />
              </h2>
              <Markdown value={site.registerDescription} />
            </Col>
            <Col md={7} className="p-5 bg-1">
              <Form> {/* TODO add https://formspree.io/ */}

                <Form.Row>
                  <Form.Group as={Col} controlId="registerEmail">
                    <FormattedMessage id="register.email" defaultMessage="Email">
                      {(l_email) => (
                        <>
                          <Form.Label>
                            {l_email}
                          </Form.Label>
                          <Form.Control type="email" />
                        </>
                      )}
                    </FormattedMessage>
                  </Form.Group>
                  <Form.Group as={Col} controlId="registerName">
                    <FormattedMessage id="register.name" defaultMessage="Name">
                      {(l_name) => (
                        <>
                          <Form.Label>
                            {l_name}
                          </Form.Label>
                          <Form.Control type="input" />
                        </>
                      )}
                    </FormattedMessage>
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="registerPreferredTime">
                    <Form.Label>
                      <FormattedMessage id="register.preferred_time" defaultMessage="Preferred time" />
                    </Form.Label>
                    <Form.Control as="select">
                      <option value=""></option>
                      <FormattedMessage id="register.preferred_time.morning" defaultMessage="Morning">
                        {(o) => <option value={o}>{o}</option>}
                      </FormattedMessage>
                      <FormattedMessage id="register.preferred_time.afternoon" defaultMessage="Afternoon">
                        {(o) => <option value={o}>{o}</option>}
                      </FormattedMessage>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} controlId="registerPreferredeDay">
                    <Form.Label>
                      <FormattedMessage id="register.preferred_day" defaultMessage="Preferred day" />
                    </Form.Label>
                    <Form.Control as="select">
                      <option value=""></option>
                      <FormattedMessage id="register.preferred_day.workday" defaultMessage="Workday">
                        {(o) => <option value={o}>{o}</option>}
                      </FormattedMessage>
                      <FormattedMessage id="register.preferred_day.weekend" defaultMessage="Weekend">
                        {(o) => <option value={o}>{o}</option>}
                      </FormattedMessage>
                    </Form.Control>
                  </Form.Group>
                </Form.Row>

                <Form.Group controlId="registerFaculty">
                  <Form.Label>
                    <FormattedMessage id="register.faculty" defaultMessage="Faculty" />
                  </Form.Label>
                  <Link to={`/faculties/#Faculties`} class="float-right">
                    <FormattedMessage id="register.faculty.help" defaultMessage="Do you need help with selection?" />
                  </Link>
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
                      <FormattedMessage id="register.consent" />
                    </Form.Text>
                  </Col>
                  <Col md={12} className="text-right p-3">
                    <Button variant="primary" type="submit" size="lg">
                      <FormattedMessage id="register.submit" defaultMessage="Submit" />
                    </Button>
                  </Col>
                </Form.Row>
              </Form>
            </Col>
          </Row>
        </Container>
        <div className="bg-1 flex-grow-1" />
      </div>
    );
  }
}
