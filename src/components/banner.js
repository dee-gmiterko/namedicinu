import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';
// import Img from "gatsby-image";

import Markdown from "./markdown";
import RotatingLogo from "./rotating_logo"

export default class Banner extends Component {
  render() {
    const { site } = this.props;
    return (
      <>
        <div className="banner">
          {/*
          <Img
            fluid={site.bannerImage.fluid}
          />
          */}
          <RotatingLogo />
          <Container>
            <Row>
              <Col md={6} className="banner-details p-3">
                <h1>{site.siteName}</h1>

                <h2>
                  {site.bannerSubtitle}
                </h2>

                <Markdown value={site.bannerDescription} />

                <ul className="social">
                  {
                    site.facebook &&
                    <li>
                      <a
                        className="fab fa-facebook-f"
                        href={site.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                      >Facebook</a>
                    </li>
                  }
                  {
                    site.twitter &&
                    <li>
                      <a
                        className="fab fa-twitter"
                        href={site.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >Twitter</a>
                    </li>
                  }
                  {
                    site.instagram &&
                    <li>
                      <a
                        className="fab fa-instagram"
                        href={site.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >Instagram</a>
                    </li>
                  }
                  {
                    site.linkdin &&
                    <li>
                      <a
                        className="fab fa-linkedin-in"
                        href={site.linkdin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >LinkedIn</a>
                    </li>
                  }
                  {
                    site.github &&
                    <li>
                      <a
                        className="fab fa-github"
                        href={site.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >Github</a>
                    </li>
                  }
                  {
                    site.email &&
                    <li>
                      <a
                        className="far fa-envelope"
                        href={"mailto:"+site.email}
                        target="_blank"
                        rel="noopener noreferrer"
                      >Email</a>
                    </li>
                  }
                </ul>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="bg-primary curved-bottom">
          <Container className="p-3">
            <Row>
              <Col md={4} className="d-flex justify-content-center align-items-center">
                <div className="p-3"><i className="fas fa-3x fa-bullseye"></i></div>
                <div>Cielene na zvolenú LF</div>
              </Col>
              <Col md={4} className="d-flex justify-content-center align-items-center">
                <div className="p-3"><i className="fas fa-3x fa-map-marker-alt"></i></div>
                <div>Prebieha online</div>
              </Col>
              <Col md={4} className="d-flex justify-content-center align-items-center">
                <div className="p-3"><i className="fas fa-3x fa-wallet"></i></div>
                <div>3,3 €/hodina (60 minút)</div>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}
