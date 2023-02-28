import React from "react";
import { Link } from "gatsby";
import { Row, Col, Button } from 'react-bootstrap';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

import { useOrder } from "./order_context";
import Markdown from "../markdown";
import Countdown from "../countdown";
import FormContact from "./form_contact";
import FormCustomizeCourse from "./form_customize_course";
import FormCustomizeVariation from "./form_customize_variation";
import FormPaymentMethod from "./form_payment_method";
import OrderRecap from "./order_recap";
import FormConsent from "./form_consent";
import Socials from "../socials"

const OrderLayout = ({ site, registerRulesDocuments }) => {
  const { product, formState, locale, formattedPrice, formattedDiscount, formattedOldPrice } = useOrder();

  const countdown = (product.registerStart && product.registerEnd) ? (
    moment(product.registerStart).isBefore(moment()) ? moment(product.registerStart) : moment(product.registerEnd)
  ) : moment();

  if (formState.succeeded) {
    return (
      <>
        <div className="form-sent d-flex flex-column justify-content-center">
          <div className="bg-circle-container">
            <div className="bg-circle">
            </div>
          </div>
          <div className="m-5">
            <h3>
              <FormattedMessage id="register.sent.title" defaultMessage="Thank you for signing up!" />
            </h3>
            <p>
              <FormattedMessage id="register.sent.message" defaultMessage="We will contact you shortly." />
            </p>
            <Socials facebook={site.facebook} instagram={site.instagram} />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <Row>
          <Col>
            <h3>{product.registerTitle}</h3>
          </Col>
        </Row>
        <Row>
          {product.action === "BuyStudentStatus" ? (
            <>
              <Col>
                <Row>
                  <Col className="text-justify">
                    <Countdown to={product.registerEnd ? moment(product.registerEnd) : moment()}>
                      {(countdown) => (
                        <Markdown value={product.registerDescription} params={{countdown: countdown}} />
                      )}
                    </Countdown>
                  </Col>
                </Row>

                <Row>
                  <Col className="text-center">
                    <Button as={Link} variant="primary" to={"/order"} state={{ product: locale === "sk" ? "Celý prípravný kurz" : "Celý přípravný kurz" }}>
                      <FormattedMessage id="order.get_full_course" defaultMessage="Register to the full course" />
                    </Button>
                  </Col>
                </Row>

              </Col>
            </>
          ) : (
            <>
              <Col md={8}>
                <Row>
                  <Col className="text-justify">
                    <Countdown to={product.registerEnd ? moment(product.registerEnd) : moment()}>
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
                    <FormContact />
                  </Col>
                </Row>

                {["BuyCourse", "BuyPreviewCourse", "BuyCourseVariation"].includes(product.action) && (
                  <Row>
                    <Col className="bg-1 p-3 mb-3">
                      <h3>
                        <FormattedMessage id="order.customize" defaultMessage="Customize course" />
                      </h3>
                      {product.action === "BuyCourseVariation" ? (
                        <FormCustomizeVariation />
                      ) : (
                        <FormCustomizeCourse />
                      )}
                    </Col>
                  </Row>
                )}

                <Row>
                  <Col className="bg-1 p-3 mb-3">
                    <h3>
                      <FormattedMessage id="order.payment_method" defaultMessage="Payment method" />
                    </h3>
                      <FormPaymentMethod />
                  </Col>
                </Row>

              </Col>
              <Col md={4}>

                <div className="p-3 mb-3">
                  <OrderRecap />
                </div>

                <div class="bg-2 p-4 mb-3 text-justify">
                  <Countdown to={countdown}>
                    {(countdown) => (
                      <Markdown value={product.priceDescription} params={{price: formattedPrice, discount: formattedDiscount, old_price: formattedOldPrice, countdown: countdown}} />
                    )}
                  </Countdown>
                </div>

                <div>
                  <FormConsent registerRulesDocuments={registerRulesDocuments} />
                </div>

              </Col>
            </>
          )}
        </Row>
      </div>
    );
  }
}

export default OrderLayout;
