import React, { Component } from "react";
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import Img from "gatsby-image";
import { Link } from "gatsby";
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";

var sliderSettings = {
  dots: true,
  arrows: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 2,
  autoplay: true,
  pauseOnHover: true,
  autoplaySpeed: 4000,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
 ]
};

export default class FacultiesOverview extends Component {
  render() {
    const { faculties } = this.props;
    return (
      <div className="faculties-overview">
        <Container>
          <Row>
            <Col md={12}>
              <h2>
                <FormattedMessage id="title.faculties" defaultMessage="Faculties" />
              </h2>
            </Col>
          </Row>
        </Container>
        <Slider {...sliderSettings}>
          {faculties.edges.map((item, index) => {
            return (
              <div key={index} className="p-3">
                <Card>
                  <Card.Img as={Img}
                    fluid={item.node.image.fluid}
                    objectFit="cover"
                    objectPosition="50% 50%"
                    style={{
                      height: "200px"
                    }}
                  />
                  <Card.Body>
                    <Card.Title><Link to={"/faculties#"+item.node.title}>{item.node.title}</Link></Card.Title>
                    <Card.Text>
                      {item.node.shortDescription}
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    {item.node.overview && item.node.overview.map((item, index) => {
                      return (
                        <ListGroupItem key={index}>{item}</ListGroupItem>
                      );
                    })}
                  </ListGroup>
                  <Card.Body>
                    <Button as={Link} to={"/faculties#"+item.node.title}>More info</Button>
                    <a href={item.node.website} target="_blank" className="btn btn-primary">Website</a>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}
