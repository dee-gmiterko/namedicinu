import React, { Component } from "react";
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import Img from "gatsby-image";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { FormattedMessage } from 'react-intl';
import { slugify_faculty } from '../common';

import Slider from "react-slick";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";

import Markdown from "./markdown";

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
    const { site, faculties } = this.props;
    return (
      <div className="faculties-overview">
        <Container>
          <Row>
            <Col md={12}>
              <h2>
                <FormattedMessage id="title.faculties" defaultMessage="Faculties" />
              </h2>
              <div className="text-justify font-italic">
                <Markdown value={site.facultiesDescription} />
              </div>
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
                  />
                  <Card.Body>
                    <Card.Title>
                      <AnchorLink to={"/faculties#"+slugify_faculty(item.node)}>
                        {item.node.title}
                      </AnchorLink>
                    </Card.Title>
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
                  <Card.Body className="flex-grow-0 d-flex justify-content-between">
                    <Button as={AnchorLink} to={"/faculties#"+slugify_faculty(item.node)}>
                      <i class="fas fa-info-circle"></i>&nbsp;
                      <FormattedMessage id="faculties_overview.more_info" defaultMessage="More info" />
                    </Button>
                    <a href={item.node.website} target="_blank" rel="noreferrer" className="btn btn-primary">
                      <i class="fas fa-globe-africa"></i>&nbsp;
                      <FormattedMessage id="faculties_overview.website" defaultMessage="Website" />
                    </a>
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
