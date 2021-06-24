import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { AnchorLink } from "gatsby-plugin-anchor-links";

import Markdown from "./markdown";
import RegisterModal from "./register_modal";

const Products = ({ site, products, faculties, locale }) => {
  const [show, setShow] = useState(null);

  const handleClose = () => setShow(null);
  const handleShow = (action) => setShow(action);

  const sizing = {
    3: 4,
    4: 3,
    5: 4,
    6: 4,
  }[products.edges.length];

  return (
    <Container className="products">
      <Row>
        <Col md={8} className="p-3 text-justify">
          <h2 id="Products">
            <FormattedMessage id="title.products" defaultMessage="Our courses" />
          </h2>
        </Col>
      </Row>
      <Row className="mb-5">
        {products.edges.map((item, index) => {
          const priceMin = Math.min( ...item.node.price.map(price => price.price) );
          const priceMax = Math.max( ...item.node.price.map(price => price.price) );

          return (
            <Col xs={12} md={sizing} className="mb-3" key={index}>
              <Card>
                <Card.Body>
                  <Card.Title className="text-center">
                    {item.node.title}
                  </Card.Title>
                  <Card.Text className="product-icon text-center">
                    {
                      Array(item.node.iconCount).fill(0).map((_, index) => {
                        return <i className={item.node.icon} key={index} />
                      })
                    }
                  </Card.Text>
                  <Card.Text as="div" className="product-description text-justify">
                    <Markdown value={item.node.description} />
                  </Card.Text>
                  <Card.Text className="product-price text-center">
                    {
                      isFinite(priceMin) && (
                        priceMin === priceMax ? (
                          <FormattedNumber
                            value={priceMin}
                            style="currency"
                            currency={locale === "sk" ? "EUR" : "CZK"}
                            maximumFractionDigits={0}
                          />
                        ) : (
                          <>
                            <FormattedNumber
                              value={priceMin}
                              style="currency"
                              currency={locale === "sk" ? "EUR" : "CZK"}
                              maximumFractionDigits={0}
                            />
                            <> - </>
                            <FormattedNumber
                              value={priceMax}
                              style="currency"
                              currency={locale === "sk" ? "EUR" : "CZK"}
                              maximumFractionDigits={0}
                            />
                          </>
                        )
                      )
                    }
                  </Card.Text>
                  <Card.Text className="text-center">
                    {
                      item.node.action === "ShowLecture" ?
                      (
                        <Button as={AnchorLink} to={"/#Lecture"}>
                          {item.node.actionName}
                        </Button>
                      ) : (
                        <Button variant="primary" onClick={() => handleShow(item.node.title)}>
                          {item.node.actionName}
                        </Button>
                      )
                    }
                  </Card.Text>
                </Card.Body>
              </Card>
              {
                item.node.action !== "ShowLecture" &&
                <RegisterModal show={show === item.node.title} onHide={handleClose} product={item.node} faculties={faculties} locale={locale} />
              }
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Products;
