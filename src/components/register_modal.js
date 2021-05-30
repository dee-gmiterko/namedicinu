import React, { useState } from "react";
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';
import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl';
import AnimateOnChange from 'react-animate-on-change';

import Products from "../components/products";
import Markdown from "./markdown";
import RegisterForm from "./register_form";

const RegisterModal = ({ show, onHide, product, faculties, locale }) => {
  const intl = useIntl();
  const [courses, setCourses] = useState(0);

  const formatStyle = {style: 'currency', currency: (locale === "sk" ? "EUR" : "CZK")};
  const hasCourses = product.action === "BuyCourse";
  const priceIndex = courses ? courses-1 : 0;

  let price, discount;
  if (hasCourses) {
    price = courses > 0 ? product.price[priceIndex].price : 0;
    discount = courses > 0 ? product.price[priceIndex].discount : 0;
  } else {
    price = product.price[0].price
    discount = product.price[0].discount
  }

  const formattedPrice = intl.formatNumber(price, formatStyle);
  const formattedDiscount = discount > 0 ? (intl.formatMessage({'id': 'register.discount'}) + "<em>" + intl.formatNumber(discount, formatStyle) + "</em>") : '';
  const formattedOldPrice = discount > 0 ? intl.formatNumber(discount + price, formatStyle) : '';

  return (
    <Modal show={show} onHide={onHide} dialogClassName="product-modal">
      <Modal.Header closeButton>
        <Modal.Title>{product.registerTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={5} className="pt-md-5 pr-md-5 text-justify">
            <Markdown value={product.registerDescription} params={{price: formattedPrice, discount: formattedDiscount, old_price: formattedOldPrice}} />
          </Col>
          <Col md={7} className="p-5 bg-1">
            <RegisterForm faculties={faculties} showCourseSelector={product.action == "BuyCourse"} onChangeNumCourses={setCourses} locale={locale} />
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

/*

<div className="d-flex flex-row register">
  <div className="flex-grow-1" />
  <Container id="Register">
    <Row>
      <Col md={5} className="pt-md-5 pr-md-5 text-justify">
        <h2>
          <FormattedMessage id="title.register" defaultMessage="Register" />
        </h2>
        <Markdown value={site.registerDescription} />
        <div className="bg-2 p-4 mb-3">
          {
            courses > 0 &&
            <p>
              <FormattedMessage id="register.price" defaultMessage="" />
              <> </>
              {site.price[courses-1].discount > 0 &&
                <>
                  <FormattedNumber
                    value={site.price[courses-1].price + site.price[courses-1].discount}
                    style="currency"
                    currency={locale === "sk" ? "EUR" : "CZK"}
                    maximumFractionDigits={0}
                  >
                    {(price) => (
                      <AnimateOnChange animationClassName="animation-blink" animate={true}>
                        <span style={{ textDecoration: "line-through"}}>{price}</span>
                      </AnimateOnChange>
                    )}
                  </FormattedNumber>
                  <> </>
                </>
              }
              <FormattedNumber
                value={site.price[courses-1].price}
                style="currency"
                currency={locale === "sk" ? "EUR" : "CZK"}
                maximumFractionDigits={0}
              >
                {(price) => (
                  <AnimateOnChange animationClassName="animation-blink" animate={true}>
                    <em>{price}</em>
                  </AnimateOnChange>
                )}
              </FormattedNumber>
              <> (</>
              <FormattedMessage id="register.discount.hint" defaultMessage="" />
              {site.price[courses-1].discount > 0 &&
                <>
                  <> – </>
                  <FormattedMessage id="register.discount" defaultMessage="discount" />
                  <> </>
                  <FormattedNumber
                    value={site.price[courses-1].discount}
                    style="currency"
                    currency={locale === "sk" ? "EUR" : "CZK"}
                    maximumFractionDigits={0}
                  >
                    {(price) => (
                      <AnimateOnChange animationClassName="animation-blink" animate={true}>
                        <em>{price}</em>
                      </AnimateOnChange>
                    )}
                  </FormattedNumber>
                </>
              }
              <>).</>
            </p>
          }
          <Markdown value={site.registerDiscount} />
        </div>
      </Col>
      <Col md={7} className="p-5 bg-1">
        <RegisterForm faculties={faculties} onChangeNumCourses={this.onChangeNumCourses.bind(this)} locale={locale} />
      </Col>
    </Row>
  </Container>
  <div className="bg-md-1 flex-grow-1" />
</div>
</div>

*/

export default RegisterModal;
