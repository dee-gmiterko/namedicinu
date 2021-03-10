import React, { Component } from "react";
import { Link } from "gatsby";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import Markdown from "./markdown";

export default class Register extends Component {
  render() {
    const { site, faculties } = this.props;
    return (
      <Container className="p-3">
        <Row className="justify-content-center align-items-center">
          <Col md={12} className="p-3">
            <h2 id="Register">
              <FormattedMessage id="title.register" defaultMessage="Register" />
            </h2>
            <Markdown value={site.registerDescription} />
          </Col>
        </Row>
        <Row>
          <Col md={12} className="p-3">
            <Form> {/* TODO add https://formspree.io/ */}
              <Form.Group controlId="registerEmail">
                <FormattedMessage id="register.email" defaultMessage="Email">
                  {(l_email) => (
                    <>
                      <Form.Label>
                        {l_email}
                      </Form.Label>
                      <Form.Control type="email" placeholder={l_email} />
                    </>
                  )}
                </FormattedMessage>
              </Form.Group>

              <Form.Group controlId="registerName">
                <FormattedMessage id="register.name" defaultMessage="Name">
                  {(l_name) => (
                    <>
                      <Form.Label>
                        {l_name}
                      </Form.Label>
                      <Form.Control type="input" placeholder={l_name} />
                    </>
                  )}
                </FormattedMessage>
              </Form.Group>

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
                <Col md={12} className="text-center">
                  <Button variant="primary" type="submit" size="lg">
                    <FormattedMessage id="register.submit" defaultMessage="Submit" />
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
