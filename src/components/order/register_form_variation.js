import React from "react";
import { useForm } from '@formspree/react';
import { Col, Form, Button, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { useOrder } from "./order_context";
import { fixNbsp, isCode, slugifyDocumentTitle } from '../../common';

function RegisterFormVariation() {
  const {
    product, formState, formDisabled, codeDiscount, setCodeDiscount, displayFaculties, price, locale,
    faculty, setFaculty, consent, setConsent
  } = useOrder();

  const filteredVariations = product.product_variation ? (
    product.product_variation.find(item => slugifyDocumentTitle(item.faculty.title) === faculty) || {variations:[]}
  ).variations : null;

  const submitDisabled = formDisabled || !consent || formState.submitting;

  return (
    <>
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
        !product.product_variation && (
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
                  setFaculty(event.target.value)
                }}
                disabled={formDisabled}
              >
                <option value=""></option>
                {displayFaculties.map((faculty, index) => {
                  return (
                    <option key={index} value={slugifyDocumentTitle(faculty.title)}>
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
              <Form.Control onChange={(e) => setCodeDiscount(isCode(e.target.value))} name="reference" type="input" disabled={formDisabled} />
              {
                codeDiscount &&
                <div className="code-discount"><em>-10%</em></div>
              }
            </>
          )}
        </FormattedMessage>
      </Form.Group>
    </>
  );
}

export default RegisterFormVariation;
