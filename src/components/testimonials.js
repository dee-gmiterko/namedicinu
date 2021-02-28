import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Slider from "react-slick";
import Img from "gatsby-image";
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
    const { data } = this.props;
    return (
      <Container className="p-3">
        <Row className="justify-content-center align-items-center">
          <Col md={12} className="p-3">
            <h2 className="text-black" id="Register">Testimonials</h2>
            <p>
              Ako prvý na Slovensku sa zaoberáme cielenou prípravou na prijímacie skúšku podľa aktuálnych požiadaviek jednotlivých lekárskych fakúlt na Slovensku a v Česku. Bez ohľadu na to, čo sa deje vo svete, celé naše kurzy NA MEDICINU sú plne online.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col>
            <Slider {...settings}>
              {data.edges.map((item, index) => {
                return (
                  <div key={index} className="testimonials-item">
                    <div className="testi-inner">
                      {/*
                      <Img
                        className="avatar"
                        fluid={item.node.avatarImage.fluid}
                        objectFit="cover"
                        objectPosition="50% 50%"
                      />
                      */}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.node.description.childMarkdownRemark.html
                        }}
                      />
                      <h3 className="name">{item.node.name}</h3>
                      <span className="sub-name">{item.node.subTitle}</span>
                    </div>
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
