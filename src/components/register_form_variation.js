import React, { useState } from "react";
import { useForm } from '@formspree/react';
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { Row, Col, Form, Button, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap';
import { useIntl, FormattedMessage } from 'react-intl';
import { pixelTrackRegister } from '../fb-pixel';

import { fixNbsp, isCode } from '../common';

function RegisterFormVariation({ productTitle, formDisabled, variations, codeDiscount, onChangeCodeDiscount, faculties, registerRulesDocuments, price, locale }) {
  const intl = useIntl();
  const [formState, handleSubmit] = useForm("register");
  const [state, setState] = useState(
    {
      faculty: "",
      consent: false,
    }
  );

  const facultiesCountry = {};
  faculties.forEach(faculty => {
    facultiesCountry[faculty.title] = faculty.country;
  })

  const update = (key, value) => {
    let newState = Object.assign({}, state);
    newState[key] = value;
    if(key === "faculty" && facultiesCountry[value] === "sk") {
      newState.physics = false;
    }
    setState(newState);
  };

  const onSubmit = (event) => {
    pixelTrackRegister();
    handleSubmit(event);
  }

  const filteredVariations = variations ? (
    variations.find(item => item.faculty.title == state.faculty) || {variations:[]}
  ).variations : null;

  if (formState.succeeded) {
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
    const submitDisabled = formDisabled || !state.consent || formState.submitting;

    return (
      <Form onSubmit={onSubmit}>
        <input type="hidden" name="_language" value={locale} />
        <input type="text" name="_gotcha" style={{display: "none"}} />

        <input type="hidden" name="product" value={productTitle} />

        {formState.errors.map((error, index) => {
          return (
            <Alert key={index} variant="danger">
              {error.field} {error.message}
            </Alert>
          )
        })}
        <Form.Row>
          <Form.Group as={Col} md={6} controlId="registerEmail">
            <FormattedMessage id="register.email" defaultMessage="Email">
              {(l_email) => (
                <>
                  <Form.Label>
                    {l_email} *
                  </Form.Label>
                  <Form.Control require="true" name="email" type="email" disabled={formDisabled} />
                </>
              )}
            </FormattedMessage>
          </Form.Group>
          <Form.Group as={Col} md={6} controlId="registerName">
            <FormattedMessage id="register.name" defaultMessage="Name">
              {(l_name) => (
                <>
                  <Form.Label>
                    {l_name} *
                  </Form.Label>
                  <Form.Control require="true" name="name" type="input" disabled={formDisabled} />
                </>
              )}
            </FormattedMessage>
          </Form.Group>
        </Form.Row>

        {
          !variations && (
            <Form.Row>
              <Form.Group as={Col} md={6} controlId="registerPreferredTime">
                <FormattedMessage id="register.preferred_time" defaultMessage="Preferred time">
                  {(l_preferred_time) => (
                    <>
                      <Form.Label>
                        {l_preferred_time}
                      </Form.Label>
                      <Form.Control name="preferred_time" as="select" disabled={formDisabled}>
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
              <Form.Group as={Col} md={6} controlId="registerPreferredeDay">
                <FormattedMessage id="register.preferred_day" defaultMessage="Preferred day">
                  {(l_preferred_day) => (
                    <>
                      <Form.Label>
                        {l_preferred_day}
                      </Form.Label>
                      <Form.Control name="preferred_day" as="select" disabled={formDisabled}>
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
          )
        }

        <Form.Group controlId="registerFaculty">
          <FormattedMessage id="register.faculty.with_variation" defaultMessage="Faculty">
            {(l_faculty) => (
              <>
                <Form.Label>
                  {l_faculty}
                </Form.Label>
                <Form.Control
                  name="faculty"
                  as="select"
                  onChange={event => {
                    update("faculty", event.target.value)
                  }}
                  disabled={formDisabled}
                >
                  <option value=""></option>
                  {faculties.map((faculty, index) => {
                    return (
                      <option key={index} value={fixNbsp(faculty.title)} data-country={faculty.country}>
                        {fixNbsp(faculty.title)}
                      </option>
                    );
                  })}
                </Form.Control>
              </>
            )}
          </FormattedMessage>
        </Form.Group>

        <Form.Group controlId="registerVariation">
          <FormattedMessage id="register.variation" defaultMessage="Variation">
            {(l_variation) => (
              <>
                <Form.Label>
                  {l_variation}
                </Form.Label>
                <Form.Control
                  name="variation"
                  as="select"
                  onChange={event => {
                    update("country", event.target.querySelector("[value='"+event.target.value+"']").getAttribute("data-country"))
                  }}
                  disabled={formDisabled}
                >
                  <option value=""></option>
                  {filteredVariations.map((variation, index) => {
                    return (
                      <option key={index} value={fixNbsp(variation)} >
                        {fixNbsp(variation)}
                      </option>
                    );
                  })}
                </Form.Control>
              </>
            )}
          </FormattedMessage>
        </Form.Group>

        <Form.Group controlId="registerReference" className="position-relative">
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
                <Form.Control onChange={(e) => onChangeCodeDiscount(isCode(e.target.value))} name="reference" type="input" disabled={formDisabled} />
                {
                  codeDiscount &&
                  <div className="code-discount"><em>-10%</em></div>
                }
              </>
            )}
          </FormattedMessage>
        </Form.Group>

        <Form.Row>
          <Col className="text-justify">
            <FormattedMessage id="register.consent" values={{
              a1: chunks => <a href={registerRulesDocuments[0]} target="_blank">{chunks}</a>,
              a2: chunks => <a href={registerRulesDocuments[1]} target="_blank">{chunks}</a>,
            }}>
              {(label) => (
                <div>
                  <Form.Check
                    size="lg"
                    label={label}
                    type="checkbox"
                    id="consent"
                    disabled={formDisabled}
                    checked={state.consent}
                    onChange={event => update("consent", event.target.checked)}
                  />
                </div>
              )}
            </FormattedMessage>
          </Col>
        </Form.Row>

        <Form.Row>
          <Col className="submit-container pt-3">
            <div className="price-container">
              <span className="label"><FormattedMessage id="register.price" defaultMessage="Price for course" /></span>
              <span className="price">{price}</span>
            </div>
            <span></span>
            <Button variant="primary" type="submit" size="lg" disabled={submitDisabled}>
              <FormattedMessage id="register.submit" defaultMessage="Submit" />
            </Button>
          </Col>
        </Form.Row>

      </Form>
    );
  }
}

export default RegisterFormVariation;
