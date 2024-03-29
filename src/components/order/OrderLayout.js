import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "gatsby";
import { Row, Col, Button } from "react-bootstrap";
import { useOrder } from "./OrderContext";
import Countdown from "../Countdown";
import FormConsent from "./FormConsent";
import FormContact from "./FormContact";
import FormCustomizeCourse from "./FormCustomizeCourse";
import FormCustomizeVariation from "./FormCustomizeVariation";
import FormPaymentMethod from "./FormPaymentMethod";
import Markdown from "../Markdown";
import moment from "moment";
import OrderRecap from "./OrderRecap";
import Socials from "../Socials";

const OrderLayout = ({ site, registerRulesDocuments }) => {
  const {
    product,
    formState,
    locale,
    formattedPrice,
    formattedDiscount,
    formattedOldPrice,
  } = useOrder();

  const countdown =
    product.registerStart && product.registerEnd
      ? moment(product.registerStart).isBefore(moment())
        ? moment(product.registerStart)
        : moment(product.registerEnd)
      : moment();

  if (formState.succeeded) {
    return (
      <>
        <div className="form-sent d-flex flex-column justify-content-center">
          <div className="bg-circle-container">
            <div className="bg-circle"></div>
          </div>
          <div className="m-5">
            <h3>
              <FormattedMessage
                id="register.sent.title"
                defaultMessage="Thank you for signing up!"
              />
            </h3>
            <p>
              <FormattedMessage
                id="register.sent.message"
                defaultMessage="We will contact you shortly."
              />
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
                    <Countdown
                      to={
                        product.registerEnd
                          ? moment(product.registerEnd)
                          : moment()
                      }
                    >
                      {(countdown) => (
                        <Markdown
                          value={product.registerDescription}
                          params={{ countdown: countdown }}
                        />
                      )}
                    </Countdown>
                  </Col>
                </Row>

                <Row>
                  <Col className="text-center">
                    <Button
                      as={Link}
                      variant="primary"
                      to={"/order"}
                      state={{
                        product:
                          locale === "sk"
                            ? "Celý prípravný kurz"
                            : "Celý přípravný kurz",
                      }}
                    >
                      <FormattedMessage
                        id="order.get_full_course"
                        defaultMessage="Register to the full course"
                      />
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
                    <Countdown
                      to={
                        product.registerEnd
                          ? moment(product.registerEnd)
                          : moment()
                      }
                    >
                      {(countdown) => (
                        <Markdown
                          value={product.registerDescription}
                          params={{ countdown: countdown }}
                        />
                      )}
                    </Countdown>
                  </Col>
                </Row>

                <Row>
                  <Col className="bg-1 p-3 mb-3">
                    <h3>
                      <FormattedMessage
                        id="order.contact_details"
                        defaultMessage="Contact information"
                      />
                    </h3>
                    <FormContact />
                  </Col>
                </Row>

                {[
                  "BuyCourse",
                  "BuyPreviewCourse",
                  "BuyCourseVariation",
                ].includes(product.action) && (
                  <Row>
                    <Col className="bg-1 p-3 mb-3">
                      <h3>
                        <FormattedMessage
                          id="order.customize"
                          defaultMessage="Customize course"
                        />
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
                      <FormattedMessage
                        id="order.payment_method"
                        defaultMessage="Payment method"
                      />
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
                      <Markdown
                        value={product.priceDescription}
                        params={{
                          price: formattedPrice,
                          discount: formattedDiscount,
                          old_price: formattedOldPrice,
                          countdown: countdown,
                        }}
                      />
                    )}
                  </Countdown>
                </div>

                <div>
                  <FormConsent
                    registerRulesDocuments={registerRulesDocuments}
                  />
                </div>
              </Col>
            </>
          )}
        </Row>
      </div>
    );
  }
};

export default OrderLayout;
