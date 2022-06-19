import React, { useState } from "react";
import { useForm } from '@formspree/react';
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { Row, Col, Form, Button, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { pixelTrackRegister } from '../../fb-pixel';
import { useOrder } from "./order_context";
import { slugifyDocumentTitle } from "../../common";

const PaymentMethodForm = () => {
  const {
    intl, formState, productTitle, formDisabled, isFullCourse, onChangeNumCourses, codeDiscount, setCodeDiscount, displayFaculties, price, locale,
    paymentFrequency, setPaymentFrequency
  } = useOrder();

  const paymentFrequencies = ["naraz", "mesacne", "1/4rocne"];

  console.log(paymentFrequency);

  return (
    <Form.Row>
      <Form.Group controlId="paymentMethod" className="col-12">
        <div className="switch-bg">
          <Form.Check
            label={intl.formatMessage({id: "order.payment.bank_transfer"})}
            type="switch"
            id="payment_method"
            disabled={true}
            checked={true}
          />
        </div>
        {isFullCourse ? (
          <>
            {paymentFrequencies.map(pf => (
              <Row className="mb-3">
                <Col xs={12}>
                  <div className="switch-bg">
                    <Form.Check
                      label={pf}
                      type="switch"
                      id={`payment_frequency_${slugifyDocumentTitle(pf)}`}
                      disabled={formDisabled}
                      checked={paymentFrequency == pf}
                      onChange={setPaymentFrequency.bind(this, pf)}
                    />
                  </div>
                </Col>
              </Row>
            ))}
          </>
        ) : (
          <>
            A
          </>
        )}
      </Form.Group>
    </Form.Row>
  );
}

export default PaymentMethodForm;
