import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Img from "gatsby-image";

import Slider from "react-slick";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";

import Markdown from "./markdown";

var settings = {
  dots: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  pauseOnHover: true,
  autoplaySpeed: 6000
};

export default class Testimonials extends Component {
  render() {
    const { site, testimonials } = this.props;
    return (
      <Container className="p-3 testimonials">
        <Row className="justify-content-center align-items-center">
          <Col md={12} className="p-3">
            <h2 className="text-black" id="Testimonials">Testimonials</h2>
            <Markdown value={site.testimonialsDescription} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Slider {...settings}>
              {testimonials.edges.map((item, index) => {
                return (
                  <div key={index}>
                    <Row>
                      <Col md={2}>
                        <i className="fas fa-3x fa-quote-left" style={{position: "absolute", top: 0, right: 0}}></i>
                      </Col>
                      <Col md={8}>
                        <div className="text-justify"
                          dangerouslySetInnerHTML={{
                            __html: item.node.description.childMarkdownRemark.html
                          }}
                        />
                      </Col>
                      <Col md={2}>
                        <i className="fas fa-3x fa-quote-right" style={{position: "absolute", bottom: 0, left: 0}}></i>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={2}>
                      </Col>
                      <Col md={8} className="d-flex flex-column align-items-end">
                        <h3 className="name">{item.node.name}</h3>
                        <span className="sub-name">{item.node.subTitle}</span>
                      </Col>
                      <Col md={2}>
                      </Col>
                    </Row>
                  </div>
                );
              })}
            </Slider>
          </Col>
        </Row>
      </Container>

    );
  }
}
