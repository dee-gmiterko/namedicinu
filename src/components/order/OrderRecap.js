import React from "react";
import { FormattedMessage } from "react-intl";
import { Row, Col } from "react-bootstrap";
import { useOrder } from "./OrderContext";
import { fixNbsp } from "../../utils";
import Markdown from "../Markdown";

function OrderRecap({ logo }) {
  const {
    intl,
    faculty,
    product,
    biology,
    chemistry,
    physics,
    tsp,
    isFullCourse,
    priceStyle,
    formattedPrice,
    formattedDiscountAmount,
  } = useOrder();
  const BA_UK = fixNbsp("Univerzita Komenského v\u00A0Bratislave");

  return (
    <>
      <Row>
        <Col>
          <h4>{product.title}</h4>
          <Markdown value={product.description} />
        </Col>
      </Row>
      {isFullCourse && [
        biology && (
          <Row>
            <Col xs={8}>
              <span className="item">
                <FormattedMessage
                  id="register.course.biology"
                  defaultMessage="Biology"
                />
              </span>
            </Col>
            <Col xs={4} className="text-right">
              {intl.formatNumber(product.price[0].price, priceStyle)}
            </Col>
          </Row>
        ),
        chemistry && (
          <Row>
            <Col xs={8}>
              <span className="item">
                <FormattedMessage
                  id="register.course.chemistry"
                  defaultMessage="Chemistry"
                />
              </span>
            </Col>
            <Col xs={4} className="text-right">
              {intl.formatNumber(product.price[0].price, priceStyle)}
            </Col>
          </Row>
        ),
        physics && (
          <Row>
            <Col xs={8}>
              <span className="item">
                <FormattedMessage
                  id={
                    faculty.includes(BA_UK)
                      ? "register.course.biophysics"
                      : "register.course.physics"
                  }
                  defaultMessage="Physics"
                />
              </span>
            </Col>
            <Col xs={4} className="text-right">
              {intl.formatNumber(product.price[0].price, priceStyle)}
            </Col>
          </Row>
        ),
        tsp && (
          <Row>
            <Col xs={8}>
              <span className="item">
                <FormattedMessage
                  id="register.course.tsp"
                  defaultMessage="TSP"
                />
              </span>
            </Col>
            <Col xs={4} className="text-right">
              {intl.formatNumber(product.price[0].price, priceStyle)}
            </Col>
          </Row>
        ),
      ]}
      {formattedDiscountAmount && (
        <Row>
          <Col xs={8}>
            <span className="item">
              <FormattedMessage
                id="order.price_discount"
                defaultMessage="Discount"
              />
            </span>
          </Col>
          <Col xs={4} className="text-right">
            - {formattedDiscountAmount}
          </Col>
        </Row>
      )}
      <hr />
      <Row>
        <Col xs={8}>
          <span className="item">
            <FormattedMessage id="order.price_total" defaultMessage="Total" />
          </span>
        </Col>
        <Col xs={4} className="text-right">
          {formattedPrice}
        </Col>
      </Row>
    </>
  );
}

export default OrderRecap;
