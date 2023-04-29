import React from "react";
import { Row, Col, Form, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { useOrder } from "./order_context";

function FormConsent({registerRulesDocuments}) {
  const {
    formState, formDisabled, isFullCourse,
    biology, chemistry, physics, consent, setConsent
  } = useOrder();

  const submitDisabled = formDisabled || !consent || formState.submitting
    || (isFullCourse && !(biology || chemistry || physics));

  return (
    <>
      <Row>
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
                  checked={consent}
                  onChange={event => setConsent(event.target.checked)}
                />
              </div>
            )}
          </FormattedMessage>
        </Col>
      </Row>

      <Row>
        <Col className="submit-container pt-3">
          <Button variant="primary" type="submit" size="lg" disabled={submitDisabled}>
            <FormattedMessage id="register.submit" defaultMessage="Submit" />
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default FormConsent;
