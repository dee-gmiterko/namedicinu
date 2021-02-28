import React, { Component } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import Img from "gatsby-image";

export default class Banner extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="banner">
        <Img
          fluid={data.bannerImage.fluid}
          style={{
            left: "50%",
          }}
        />
        <Container>
          <div className="banner-details">
            <h1>{data.siteName}</h1>
            <p className="subTitle">
              <strong>Dostaň sa na svoju vysnenú lekársku fakultu.</strong>
            </p>
            <p>
              Príde ti to ťažké alebo nevieš, kde začať? Prípravné kurzy <b>na medicínu</b> ťa prevedú celou cestou.
            </p>

            <ul className="social">
              <li>
                <a
                  className="fab fa-facebook-f"
                  // href={data.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>
              </li>
              <li>
                <a
                  className="fab fa-twitter"
                  // href={data.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>
              </li>
              <li>
                <a
                  className="fab fa-instagram"
                  // href={data.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>
              </li>
              <li>
                <a
                  className="fab fa-linkedin-in"
                  // href={data.linkdin}
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>
              </li>
              <li>
                <a
                  className="fab fa-github"
                  // href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>
              </li>
            </ul>
          </div>
        </Container>
      </div>
    );
  }
}
