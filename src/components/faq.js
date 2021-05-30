import React, { Component } from "react";
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import Markdown from "./markdown";

export default class FAQ extends Component {
  render() {
    const { faq } = this.props;
    return (
      <Container className="faq">
        <Row>
          <Col md={8} className="p-3 text-justify">
            <h2 id="FAQ">
              <FormattedMessage id="title.faq" defaultMessage="FAQ" />
            </h2>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col>
            <Accordion defaultActiveKey="0">
              {faq.edges.map((item, index) => {
                return (
                  <div key={index}>
                    <Accordion.Toggle as="h3" eventKey={String(index)}>
                      {item.node.question}
                      <i className="fas fa-chevron-down float-right" />
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={String(index)} className="text-justify">
                      <Markdown value={item.node.answer} />
                    </Accordion.Collapse>
                  </div>
                );
              })}
            </Accordion>
          </Col>
        </Row>
      </Container>
    );
  }
}
