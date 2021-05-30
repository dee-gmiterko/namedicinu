import React, { useState } from "react";
import { Row, Col, Modal } from 'react-bootstrap';
import { useIntl } from 'react-intl';

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
      <Modal.Header className="pl-5 pt-5 pr-5" closeButton>
        <Modal.Title>{product.registerTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={5} className="pl-5 pr-5 text-justify">
            <Markdown value={product.registerDescription} params={{price: formattedPrice, discount: formattedDiscount, old_price: formattedOldPrice}} />
          </Col>
          <Col md={7} className="p-5 mb-5 bg-1">
            <RegisterForm faculties={faculties} showCourseSelector={product.action === "BuyCourse"} onChangeNumCourses={setCourses} locale={locale} />
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default RegisterModal;
