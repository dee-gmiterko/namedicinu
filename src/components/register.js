import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import AnimateOnChange from 'react-animate-on-change';

import Markdown from "./markdown";
import RegisterForm from "./register_form";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: 'cz',
    };
  }

  onSelectFaculty(target) {
    const country = target.querySelector("[value='"+target.value+"']").getAttribute("data-country");
    this.setState({
      country,
    })
  }

  render() {
    const { site, faculties } = this.props;
    const { country } = this.state;
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
                <p>
                  <FormattedMessage id="register.price" defaultMessage="" />
                  &nbsp;
                  <FormattedMessage id={"register.price."+country} defaultMessage="653€">
                    {(price) => (
                      <AnimateOnChange animationClassName="animation-blink" animate={true}>
                        <strong>{price}</strong>
                      </AnimateOnChange>
                    )}
                  </FormattedMessage>
                </p>
                <Markdown value={site.registerDiscount} />
              </div>
            </Col>
            <Col md={7} className="p-5 bg-1">
              <RegisterForm faculties={faculties} onSelectFaculty={this.onSelectFaculty.bind(this)} />
            </Col>
          </Row>
        </Container>
        <div className="bg-md-1 flex-grow-1" />
      </div>
    );
  }
}
