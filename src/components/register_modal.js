import React, { useState } from "react";
import { Row, Col, Modal } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import moment from 'moment';

import Markdown from "./markdown";
import RegisterForm from "./register_form";
import Countdown from "./countdown";

const RegisterModal = ({ show, onHide, product, faculties, registerRulesDocuments, locale }) => {
  const intl = useIntl();
  const [courses, setCourses] = useState(0);
  const [codeDiscount, setCodeDiscount] = useState(false);

  const formatStyle = {style: 'currency', currency: (locale === "sk" ? "EUR" : "CZK"), maximumFractionDigits: 0};
  const hasCourses = product.action === "BuyCourse";
  const priceIndex = courses ? courses-1 : 0;

  let price, discount;
  if (product.price.length > 0) {
    if (hasCourses) {
      price = courses > 0 ? product.price[priceIndex].price : 0;
      discount = courses > 0 ? product.price[priceIndex].discount : 0;
    } else {
      price = product.price[0].price
      discount = product.price[0].discount
    }

    if (codeDiscount) {
      const cd = Math.round(0.1 * price);
      price = price - cd;
      discount = discount + cd;
    }
  } else {
    price = discount = 0;
  }

  const formattedPrice = intl.formatNumber(price, formatStyle);
  const formattedDiscount = discount > 0 ? (intl.formatMessage({'id': 'register.discount'}) + "<em>" + intl.formatNumber(discount, formatStyle) + "</em>") : '';
  const formattedOldPrice = discount > 0 ? intl.formatNumber(discount + price, formatStyle) : '';

  return (
    <Modal show={show} onHide={onHide} dialogClassName="product-modal">
      <Modal.Header className="pl-5 pt-5 pr-5" closeButton>
        <Modal.Title>{product.registerTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {
            product.action === "BuyStudentStatus" ? (
              <Col className="pl-5 pr-5 text-justify">
                <Markdown value={product.registerDescription} params={{price: formattedPrice, discount: formattedDiscount, old_price: formattedOldPrice}} />
              </Col>
            ) : (
              <>
                <Col md={5} className="pl-5 pr-5 text-justify">
                  <Countdown to={moment("09-11", "MM-DD")}>
                    {(countdown) => (
                      <Markdown value={product.registerDescription} params={{price: formattedPrice, discount: formattedDiscount, old_price: formattedOldPrice, countdown: countdown}} />
                    )}
                  </Countdown>
                </Col>
                <Col md={7} className="p-5 mb-5 bg-1">
                  <RegisterForm productTitle={product.title} showCourseSelector={product.action === "BuyCourse"} onChangeNumCourses={setCourses} codeDiscount={codeDiscount} onChangeCodeDiscount={setCodeDiscount} faculties={faculties} registerRulesDocuments={registerRulesDocuments} locale={locale} />
                </Col>
              </>
            )
          }
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default RegisterModal;
