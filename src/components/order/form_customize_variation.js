import React from "react";
import { Row, Col, Form } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { useOrder } from "./order_context";
import { fixNbsp, slugifyDocumentTitle } from '../../common';

function FormCustomizeVariation() {
  const { product, formDisabled, displayFaculties, faculty, setFaculty, variation, setVariation } = useOrder();

  const filteredVariations = product.product_variation ? (
    product.product_variation.find(item => slugifyDocumentTitle(item.faculty.title) === faculty) || {variations:[]}
  ).variations : null;

  return (
    <>
      {
        !product.product_variation && (
          <Row>
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
          </Row>
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
                value={variation}
                onChange={event => {
                  setVariation(event.target.value)
                }}
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
    </>
  );
}

export default FormCustomizeVariation;
