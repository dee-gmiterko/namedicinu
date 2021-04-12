import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import AnimateOnChange from 'react-animate-on-change';

import Markdown from "./markdown";
import RegisterForm from "./register_form";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: 3,
    };
  }

  onChangeNumCourses(courses) {
    this.setState({
      courses,
    })
  }

  render() {
    const { site, faculties, locale } = this.props;
    const { courses } = this.state;
    return (
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
                    &nbsp;
                    <FormattedNumber
                      value={site.price[courses-1].price}
                      style="currency"
                      currency={locale === "sk" ? "EUR" : "CZK"}
                      maximumFractionDigits={0}
                    >
                      {(price) => (
                        <AnimateOnChange animationClassName="animation-blink" animate={true}>
                          <strong>{price}</strong>
                          {
                            site.price[courses-1].discount > 0 &&
                            <>
                              <> (</>
                              <FormattedMessage id="register.discount" defaultMessage="discount" />
                              <> </>
                              <FormattedNumber
                                value={site.price[courses-1].discount}
                                style="currency"
                                currency={locale === "sk" ? "EUR" : "CZK"}
                                maximumFractionDigits={0}
                              >
                                {(price) => (
                                  <strong>{price}</strong>
                                )}
                              </FormattedNumber>
                              <>)</>
                            </>
                          }
                        </AnimateOnChange>
                      )}
                    </FormattedNumber>
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
    );
  }
}
