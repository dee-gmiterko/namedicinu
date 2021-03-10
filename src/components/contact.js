import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import MessengerMessageUs from 'react-messenger-message-us';
import { FormattedMessage } from 'react-intl';

export default class service extends Component {
  render() {
    const { site } = this.props;
    return (
      <Container className="p-3">
        <Row>
          <Col md={12} className="p-3">
            <h2 id="Contact">
              <FormattedMessage id="title.contact" defaultMessage="Contact" />
            </h2>
          </Col>
        </Row>
        <dl>

          {
            site.email &&
            <Row className="justify-content-center align-items-center">
              <dt className="col-sm-2">
                <FormattedMessage id="contact.email" defaultMessage="Email" />
              </dt>
              <dd className="col-sm-4">{site.email}</dd>
            </Row>
          }

          {
            site.fbPageId && site.fbAppId &&
            <Row className="justify-content-center align-items-center">
              <dt class="col-sm-2">
                <FormattedMessage id="contact.messenger" defaultMessage="Messenger" />
              </dt>
              <dd class="col-sm-4">
                <MessengerMessageUs pageId={site.fbPageId} appId={site.fbAppId} size="large" />
              </dd>
            </Row>
          }

          {
            (site.facebook || site.instagram) &&
            <Row className="justify-content-center align-items-center">
              <dt class="col-sm-2">
                <FormattedMessage id="contact.socials" defaultMessage="Socials" />
              </dt>
              <dd class="col-sm-4">
                <ul className="social">
                  <li>
                    <a
                      className="fab fa-facebook-f"
                      href={site.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >Facebook</a>
                  </li>
                  <li>
                    <a
                      className="fab fa-instagram"
                      href={site.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >Instagram</a>
                  </li>
                </ul>
              </dd>
            </Row>
          }

        </dl>
      </Container>
    );
  }
}
