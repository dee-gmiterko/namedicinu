import React, { useState } from "react";
import { Row, Col } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import moment from 'moment';
import { FormattedMessage, FormattedDate } from 'react-intl';
import Img from "gatsby-image";

import { useOrder } from "./order_context";
import Markdown from "../markdown";
import RegisterForm from "./register_form";
import RegisterFormVariation from "./register_form_variation";
import PaymentMethodForm from "./payment_method_form";
import OrderProduct from "./order_product";
import ConsentForm from "./consent_form";
import Countdown from "../countdown";

//TODO params={{price: formattedPrice, discount: formattedDiscount, old_price: formattedOldPrice}}
//TODO params={{price: formattedPrice, discount: formattedDiscount, old_price: formattedOldPrice, countdown: countdown}}
const OrderDetails = ({ registerRulesDocuments, logo }) => {
  const { product, faculties, formState, locale } = useOrder();

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
    return (
      <div className="order">
        <Row>
          <Col>
            <h3>{product.registerTitle}</h3>
          </Col>
        </Row>
        <Row>
          {
            (product.action === "BuyStudentStatus") && (
              <Col className="pl-5 pr-5 text-justify">
                <Markdown value={product.registerDescription} />
              </Col>
            )
          }
          <Col md={8}>
            <Row>
              <Col className="text-justify">
                <Countdown to={product.registerEnd ? moment(product.registerEnd) : moment.now()}>
                  {(countdown) => (
                    <Markdown value={product.registerDescription} params={{countdown: countdown}} />
                  )}
                </Countdown>
              </Col>
            </Row>

            <Row>
              <Col className="bg-1 p-3 mb-3">
                <h3>
                  <FormattedMessage id="order.contact_details" defaultMessage="Contact information" />
                </h3>
                {(product.action === "BuyCourse" || product.action === "BuyPreviewCourse") && (
                  <RegisterForm />
                )}
                {product.action === "BuyCourseVariation" && (
                  <RegisterFormVariation />
                )}
              </Col>
            </Row>

            {(product.action === "BuyCourse" || product.action === "BuyPreviewCourse") && (
              <Row>
                <Col className="bg-1 p-3 mb-3">
                  <h3>
                    <FormattedMessage id="order.payment_method" defaultMessage="Payment method" />
                  </h3>
                    <PaymentMethodForm />
                </Col>
              </Row>
            )}

          </Col>
          <Col md={4}>

            <Row>
              <Col className="p-3 mb-3">
                <OrderProduct logo={logo} />
              </Col>
            </Row>

            <Row>
              <Col>
                <ConsentForm registerRulesDocuments={registerRulesDocuments} />
              </Col>
            </Row>

          </Col>
        </Row>
      </div>
    );
  }
}

export default OrderDetails;
