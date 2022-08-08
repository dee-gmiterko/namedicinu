import React from "react";
import Markdown from "../markdown"
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { FormattedMessage } from 'react-intl';
import { Row, Col, Form, Button, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap';
import { useForm } from '@formspree/react';
import { useOrder } from "./order_context";

function OrderRecap({ logo }) {
  const { intl, product, biology, chemistry, physics, isFullCourse, priceStyle, formattedPrice, formattedDiscountAmount, formattedOldPrice } = useOrder();

  return (
    <>
      <Row>
        <Col>
          <h4>{product.title}</h4>
          <Markdown value={product.description} />
        </Col>
      </Row>
      {isFullCourse && [
        (biology && (
          <Row>
            <Col xs={8}>
              <span className="item">
                <FormattedMessage id="register.course.biology" defaultMessage="Biology" />
              </span>
            </Col>
            <Col xs={4} className="text-right">
              {intl.formatNumber(product.price[0].price, priceStyle)}
            </Col>
          </Row>
        )),
        (chemistry && (
          <Row>
            <Col xs={8}>
              <span className="item">
                <FormattedMessage id="register.course.chemistry" defaultMessage="Chemistry" />
              </span>
            </Col>
            <Col xs={4} className="text-right">
              {intl.formatNumber(product.price[0].price, priceStyle)}
            </Col>
          </Row>
        )),
        (physics && (
          <Row>
            <Col xs={8}>
              <span className="item">
                <FormattedMessage id="register.course.physics" defaultMessage="Physics" />
              </span>
            </Col>
            <Col xs={4} className="text-right">
              {intl.formatNumber(product.price[0].price, priceStyle)}
            </Col>
          </Row>
        ))
      ]}
      {formattedDiscountAmount && (
        <Row>
          <Col xs={8}>
            <span className="item">
              <FormattedMessage id="order.price_discount" defaultMessage="Discount" />
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
