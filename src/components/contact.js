import React, { Component } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { pixelTrackContact } from '../fb-pixel';

export default class service extends Component {
  shouldComponentUpdate() {
    return false; // static component
  }

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
            <Col md={6} className="text-center text-sm-left">
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
                    <dt className="col-sm-4">
                      <FormattedMessage id="contact.messenger" defaultMessage="Messenger" />
                    </dt>
                    <dd className="col-sm-8">
                      <Button
                        href={"https://m.me/" + site.fbPageId}
                        onClick={pixelTrackContact}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="primary"
                        size="sm"
                      >
                        <i className="fab fa-facebook-messenger" /> <FormattedMessage id="contact.message_us" defaultMessage="Message Us" />
                      </Button>
                    </dd>
                  </Row>
                }
              </dl>
            </Col>
            <Col md={6} className="text-right d-none d-md-block" style={{top: "-40px"}}>
              <p>
                <FormattedMessage id="contact.register_prompt" defaultMessage="What are you waiting for?" />
              </p>
              <Button as={AnchorLink} to="/#Products" variant="primary">
                <FormattedMessage id="contact.register" defaultMessage="Submit" />
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
