import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";

import Markdown from "./markdown";

var settings = {
  dots: true,
  arrows: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  pauseOnHover: true,
  autoplaySpeed: 6000,
};

export default class Testimonials extends Component {
  render() {
    const { site, testimonials } = this.props;
    return (
      <Container className="testimonials">
        <Row>
          <Col md={8} className="p-3 text-justify">
            <h2 id="Testimonials">
              <FormattedMessage id="title.testimonials" defaultMessage="Testimonials" />
            </h2>
            <Markdown value={site.testimonialsDescription} />
          </Col>
        </Row>
        <Row className="bg-2">
          <Col>
            <Slider {...settings}>
              {testimonials.edges.map((item, index) => {
                return (
                  <div key={index}>
                    <Row className="pb-3">
                      <Col lg={1} className="d-none d-lg-block">
                        <i className="fas fa-3x fa-quote-left" style={{position: "absolute", top: 0, right: 0}}></i>
                      </Col>
                      <Col xs={12} lg={10}>
                        <div className="text-justify testimonial-text pr-3 pl-3">
                          <Markdown value={item.node.description} />
                        </div>
                      </Col>
                      <Col lg={1} className="d-none d-lg-block">
                        <i className="fas fa-3x fa-quote-right" style={{position: "absolute", bottom: 0, left: 0}}></i>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={1} className="d-none d-lg-block">
                      </Col>
                      <Col xs={12} lg={10} className="d-flex flex-column align-items-end">
                        <div className="pr-3 pl-3">
                          <h3 className="name">{item.node.name}</h3>
                          <span className="sub-name">{item.node.subTitle}</span>
                        </div>
                      </Col>
                      <Col lg={1} className="d-none d-lg-block">
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
