import React from "react";
import { useForm } from '@formspree/react';
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { Col, Form, Button, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

function RegisterForm({ faculties }) {

  const [state, handleSubmit] = useForm("register");

  if (state.succeeded) {
    return (
      <div className="form-sent d-flex flex-column justify-content-center">
        <div className="bg-circle-container">
          <div className="bg-circle">
          </div>
        </div>
        <h3>
          <FormattedMessage id="register.sent.title" defaultMessage="Thank you for signing up!" />
        </h3>
        <p>
          <FormattedMessage id="register.sent.message" defaultMessage="We will contact you shortly." />
        </p>
      </div>
    );

  } else {
    return (
      <Form onSubmit={handleSubmit}>
        {state.errors.map((error, index) => {
          return (
            <Alert key={index} variant="danger">
              {error.field} {error.message}
            </Alert>
          )
        })}
        <Form.Row>
          <Form.Group as={Col} controlId="registerEmail">
            <FormattedMessage id="register.email" defaultMessage="Email">
              {(l_email) => (
                <>
                  <Form.Label>
                    {l_email}
                  </Form.Label>
                  <Form.Control name="email" type="email" />
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
                  <Form.Control name="name" type="input" />
                </>
              )}
            </FormattedMessage>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="registerPreferredTime">
            <FormattedMessage id="register.preferred_time" defaultMessage="Preferred time">
              {(l_preferred_time) => (
                <>
                  <Form.Label>
                    {l_preferred_time}
                  </Form.Label>
                  <Form.Control name="preferred_time" as="select">
                    <option value=""></option>
                    <FormattedMessage id="register.preferred_time.morning" defaultMessage="Morning">
                      {(o) => <option value={o}>{o}</option>}
                    </FormattedMessage>
                    <FormattedMessage id="register.preferred_time.afternoon" defaultMessage="Afternoon">
                      {(o) => <option value={o}>{o}</option>}
                    </FormattedMessage>
                  </Form.Control>
                </>
              )}
            </FormattedMessage>
          </Form.Group>
          <Form.Group as={Col} controlId="registerPreferredeDay">
            <FormattedMessage id="register.preferred_day" defaultMessage="Preferred day">
              {(l_preferred_day) => (
                <>
                  <Form.Label>
                    {l_preferred_day}
                  </Form.Label>
                  <Form.Control name="preferred_day" as="select">
                    <option value=""></option>
                    <FormattedMessage id="register.preferred_day.workday" defaultMessage="Workday">
                      {(o) => <option value={o}>{o}</option>}
                    </FormattedMessage>
                    <FormattedMessage id="register.preferred_day.weekend" defaultMessage="Weekend">
                      {(o) => <option value={o}>{o}</option>}
                    </FormattedMessage>
                  </Form.Control>
                </>
              )}
            </FormattedMessage>
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="registerFaculty">
          <FormattedMessage id="register.faculty" defaultMessage="Faculty">
            {(l_faculty) => (
              <>
                <Form.Label>
                  {l_faculty}
                </Form.Label>
                <AnchorLink to={`/faculties/#Faculties`} className="float-right">
                  <FormattedMessage id="register.faculty.help" defaultMessage="Do you need help with selection?" />
                </AnchorLink>
                <Form.Control name="faculty" as="select" onChange={event => this.onSelectFaculty(event.target)}>
                  <option value=""></option>
                  {faculties.edges.map((item, index) => {
                    return (
                      <option value={item.node.title} data-country={item.node.country}>{item.node.title}</option>
                    );
                  })}
                </Form.Control>
              </>
            )}
          </FormattedMessage>
        </Form.Group>

        <Form.Group controlId="registerReference">
          <FormattedMessage id="register.reference" defaultMessage="Reference">
            {(l_reference) => (
              <>
                <Form.Label>
                  {l_reference}&nbsp;
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id="tooltip-reference">
                        <FormattedMessage id="register.reference.help" defaultMessage="E.g., Facebook" />
                      </Tooltip>
                    }
                  >
                    <i className="fa fa-question-circle help" />
                  </OverlayTrigger>
                </Form.Label>
                <Form.Control name="reference" type="input" />
              </>
            )}
          </FormattedMessage>
        </Form.Group>

        <Form.Row>
          <Col md={12} className="text-justify">
            <Form.Text>
              <FormattedMessage id="register.consent" />
            </Form.Text>
          </Col>
          <Col md={12} className="text-right p-3">
            <Button variant="primary" type="submit" size="lg" disabled={state.submitting}>
              <FormattedMessage id="register.submit" defaultMessage="Submit" />
            </Button>
          </Col>
        </Form.Row>

      </Form>
    );
  }
}

export default RegisterForm;
