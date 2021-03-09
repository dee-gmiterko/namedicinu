import React, { Component } from "react";
import { Container } from 'react-bootstrap';
// import Img from "gatsby-image";

import Markdown from "./markdown";
import RotatingLogo from "./rotating_logo"

export default class Banner extends Component {
  render() {
    const { site } = this.props;
    return (
      <div className="banner">
        {/*
        <Img
          fluid={site.bannerImage.fluid}
        />
        */}
        <RotatingLogo />
        <Container>
          <div className="banner-details">
            <h1>{site.siteName}</h1>

            <p className="subTitle">
              {site.bannerSubtitle}
            </p>

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
          </div>
        </Container>
      </div>
    );
  }
}
