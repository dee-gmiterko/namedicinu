import { Link } from "gatsby";
import React, { Component } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import MessengerMessageUs from 'react-messenger-message-us';
import { FormattedMessage } from 'react-intl';

export default class service extends Component {
  render() {
    const { site } = this.props;
    return (
      <div className="contact">
        <Container>
          <Row>
            <Col md={12} className="p-3">
              <h2 id="Contact" className="mb-3">
                <FormattedMessage id="title.contact" defaultMessage="Contact" />
              </h2>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <dl>
                {
                  site.email &&
                  <Row>
                    <dt className="col-sm-4">
                      <FormattedMessage id="contact.email" defaultMessage="Email" />
                    </dt>
                    <dd className="col-sm-8">{site.email}</dd>
                  </Row>
                }
                {
                  site.fbPageId && site.fbAppId &&
                  <Row>
                    <dt class="col-sm-4">
                      <FormattedMessage id="contact.messenger" defaultMessage="Messenger" />
                    </dt>
                    <dd class="col-sm-8">
                      <MessengerMessageUs pageId={site.fbPageId} appId={site.fbAppId} size="large" />
                    </dd>
                  </Row>
                }
              </dl>
            </Col>
            <Col md={6} className="text-right d-none d-md-block" style={{top: "-40px"}}>
              <p>
                <FormattedMessage id="contact.register_prompt" defaultMessage="What are you waiting for?" />
              </p>
              <Button as={Link} to="/#Register" variant="primary">
                <FormattedMessage id="contact.register" defaultMessage="Submit" />
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
