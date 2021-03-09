import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import MessengerMessageUs from 'react-messenger-message-us';

export default class service extends Component {
  render() {
    const { site } = this.props;
    return (
      <Container className="p-3">
        <Row>
          <Col md={12} className="p-3">
            <h2 id="Contact">Contact</h2>
          </Col>
        </Row>
        <dl>

          {
            site.email &&
            <Row className="justify-content-center align-items-center">
              <dt className="col-sm-2">Email</dt>
              <dd className="col-sm-4">{site.email}</dd>
            </Row>
          }

          {
            site.fbPageId && site.fbAppId &&
            <Row className="justify-content-center align-items-center">
              <dt class="col-sm-2">Messenger</dt>
              <dd class="col-sm-4">
                <MessengerMessageUs pageId={site.fbPageId} appId={site.fbAppId} size="large" />
              </dd>
            </Row>
          }

          {
            (site.facebook || site.instagram) &&
            <Row className="justify-content-center align-items-center">
              <dt class="col-sm-2">Socials</dt>
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
