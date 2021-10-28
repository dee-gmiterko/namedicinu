import React, { useState } from "react";
import { Row, Col, Modal } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import moment from 'moment';

import Markdown from "./markdown";
import RegisterForm from "./register_form";
import RegisterFormVariation from "./register_form_variation";
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

  const formDisabled = product.registerStart && product.registerEnd && (moment.now() < moment(product.registerStart) || moment.now() > moment(product.registerEnd));

  console.log(product.product_variation);

  const displayFaculties = product.product_variation ? (
    product.product_variation
      .filter(pv => ( pv.showOn||[] ).includes(locale))
      .map(pv => pv.faculty)
      .sort((a, b) => a.title.localeCompare(b.title))
  ) : (
    faculties.edges.map(item => ({
      title: item.node.title,
      country: item.node.country,
    })) || []
  );

  const showCourseSelector = product.action === "BuyCourse";

  return (
    <Modal show={show} onHide={onHide} dialogClassName="product-modal">
      <Modal.Header className="pl-5 pt-5 pr-5" closeButton>
        <Modal.Title>{product.registerTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {
            (product.action === "BuyStudentStatus") && (
              <Col className="pl-5 pr-5 text-justify">
                <Markdown value={product.registerDescription} params={{price: formattedPrice, discount: formattedDiscount, old_price: formattedOldPrice}} />
              </Col>
            )
          }
          {
            (product.action === "BuyCourse" || product.action === "BuyPreviewCourse") && (
              <>
                <Col md={5} className="pl-5 pr-5 text-justify">
                  <Countdown to={product.registerEnd ? moment(product.registerEnd) : moment.now()}>
                    {(countdown) => (
                      <Markdown value={product.registerDescription} params={{price: formattedPrice, discount: formattedDiscount, old_price: formattedOldPrice, countdown: countdown}} />
                    )}
                  </Countdown>
                </Col>
                <Col md={7} className="p-5 mb-md-5 bg-1">
                  <RegisterForm productTitle={product.title} formDisabled={formDisabled} showCourseSelector={showCourseSelector} onChangeNumCourses={setCourses} codeDiscount={codeDiscount} onChangeCodeDiscount={setCodeDiscount} faculties={displayFaculties} registerRulesDocuments={registerRulesDocuments} price={formattedPrice} locale={locale} />
                </Col>
              </>
            )
          }
          {
            (product.action === "BuyCourseVariation") && (
              <>
                <Col md={5} className="pl-5 pr-5 text-justify">
                  <Countdown to={product.registerEnd ? moment(product.registerEnd) : moment.now()}>
                    {(countdown) => (
                      <Markdown value={product.registerDescription} params={{price: formattedPrice, discount: formattedDiscount, old_price: formattedOldPrice, countdown: countdown}} />
                    )}
                  </Countdown>
                </Col>
                <Col md={7} className="p-5 mb-md-5 bg-1">
                  <RegisterFormVariation productTitle={product.title} formDisabled={formDisabled} variations={product.product_variation} codeDiscount={codeDiscount} onChangeCodeDiscount={setCodeDiscount} faculties={displayFaculties} registerRulesDocuments={registerRulesDocuments} price={formattedPrice} locale={locale} />
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
