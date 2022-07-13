import React, { useState } from "react";
import { useForm } from '@formspree/react';
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { Row, Col, Form, Button, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import moment from "moment";

import Markdown from "../markdown";
import { pixelTrackRegister } from '../../fb-pixel';
import { useOrder } from "./order_context";
import { slugifyDocumentTitle } from "../../common";

const FormPaymentMethod = () => {
  const { intl, product, formDisabled, isFullCourse, paymentFrequency, setPaymentFrequency, price, courses, priceStyle, paymentFrequencies } = useOrder();

  const priceIndex = courses ? courses-1 : 0;
  const deposit = (courses > 0 && product.price.length >= courses) ? product.price[priceIndex].deposit : 0;
  const formattedDeposit = intl.formatNumber(deposit, priceStyle);
  const depositDueDate = product.registerEnd ? (
    moment(Math.min(moment().add(14, 'days').valueOf(), moment(product.registerEnd).valueOf()))
  ) : moment();

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
          <div className="pl-5 mt-3 pr-3 payment-frequency">
            {paymentFrequencies.edges.map(({node: pf}) => (
              <>
                <Row className="pt-3 mb-2 bg-2">
                  <Col>
                    <Form.Check
                      type="radio"
                      id={`payment_frequency_${slugifyDocumentTitle(pf.title)}`}
                      disabled={formDisabled}
                    >
                      <Form.Check.Input
                        type="radio"
                        name="payment_frequency"
                        value={pf.title}
                        disabled={formDisabled}
                      />
                      <Form.Check.Label>
                        <div className="label-title">{pf.title}</div>
                        <Markdown value={pf.message} params={{
                          deposit: formattedDeposit,
                          depositDueDate: intl.formatDate(
                            depositDueDate,
                            {year:"numeric", month:"long", day:"numeric"}
                          ),
                          payment: intl.formatNumber((price-deposit) / pf.portions, priceStyle)
                        }} />
                      </Form.Check.Label>
                    </Form.Check>
                  </Col>
                </Row>
              </>
            ))}
          </div>
        ) : (
          <div className="pl-5 mt-3 pr-3 payment-frequency">
            <Row className="pt-3 mb-2 bg-2">
              <Col>
                <p>
                  <FormattedMessage
                    id="order.payment.bank_transfer.description"
                    defaultMessage="Due to {depositDueDate}!"
                    values={{
                      depositDueDate: intl.formatDate(
                        depositDueDate,
                        {year:"numeric", month:"long", day:"numeric"}
                      ),
                    }}
                  />
                </p>
              </Col>
            </Row>
          </div>
        )}
      </Form.Group>
    </Form.Row>
  );
}

export default FormPaymentMethod;