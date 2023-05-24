import React, { Component } from "react";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { GatsbyImage } from "gatsby-plugin-image";
import { slugifyFaculty, fixNbsp } from "../utils";
import Markdown from "./Markdown";
import Slider from "react-slick";

import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";

const responsiveFew = [
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
];

const responsiveMany = [
  {
    breakpoint: 1500,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 2,
    },
  },
  {
    breakpoint: 1200,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 2,
    },
  },
  {
    breakpoint: 900,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
    },
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
];

const sliderSettings = (amount) => ({
  dots: true,
  arrows: true,
  speed: 500,
  accessibility: false,
  slidesToShow: amount < 4 ? amount : 5,
  slidesToScroll: 2,
  autoplay: true,
  pauseOnHover: true,
  autoplaySpeed: 4000,
  centerMode: true,
  responsive: amount < 4 ? responsiveFew : responsiveMany,
});

export default class FacultiesOverview extends Component {
  shouldComponentUpdate() {
    return false; // static component
  }

  keyHandler({ key }) {
    if (this.slider) {
      if (key === "ArrowLeft") {
        this.slider.slickPrev();
      }
      if (key === "ArrowRight") {
        this.slider.slickNext();
      }
    }
  }

  componentDidMount() {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", this.keyHandler.bind(this));
    }
  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("keydown", this.keyHandler.bind(this));
    }
  }

  render() {
    const { site, faculties } = this.props;
    return (
      <div className="faculties-overview">
        <Container>
          <Row>
            <Col>
              <h2 id="Faculties">
                <FormattedMessage
                  id="title.faculties"
                  defaultMessage="Faculties"
                />
              </h2>
              <div className="text-justify font-italic">
                <Markdown value={site.facultiesDescription} />
              </div>
            </Col>
          </Row>
        </Container>
        <Slider
          ref={(c) => {
            this.slider = c;
          }}
          {...sliderSettings(faculties.length)}
        >
          {faculties.map((faculty, index) => {
            return (
              <div key={index} className="p-3">
                <Card>
                  <Card.Img
                    as={GatsbyImage}
                    image={faculty.image.gatsbyImageData}
                    objectFit="cover"
                    objectPosition="50% 50%"
                  />
                  <Card.Body>
                    <Card.Title>
                      <AnchorLink to={"/faculties#" + slugifyFaculty(faculty)}>
                        {fixNbsp(faculty.title)}
                      </AnchorLink>
                    </Card.Title>
                    <div className="flags">
                      {faculty.dentistry && (
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="tooltip-reference">
                              <FormattedMessage
                                id="faculties_overview.flag.dentistry"
                                defaultMessage="This faculty offers also dentistry"
                              />
                            </Tooltip>
                          }
                        >
                          <i className="fa fa-tooth" />
                        </OverlayTrigger>
                      )}
                      {faculty.oralInterview && (
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="tooltip-reference">
                              <FormattedMessage
                                id="faculties_overview.flag.oral_interview"
                                defaultMessage="This faculty has oral interview"
                              />
                            </Tooltip>
                          }
                        >
                          <i className="far fa-comment-dots" />
                        </OverlayTrigger>
                      )}
                    </div>
                    <Card.Text>{fixNbsp(faculty.shortDescription)}</Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush checkmark">
                    {faculty.overview &&
                      faculty.overview.map((item, index) => {
                        return (
                          <ListGroupItem
                            key={index}
                            className="d-flex align-items-center"
                          >
                            <i className="far fa-check-circle" />
                            <span>{item}</span>
                          </ListGroupItem>
                        );
                      })}
                  </ListGroup>
                  <Card.Body className="flex-grow-0 d-flex justify-content-between">
                    <Button
                      as={AnchorLink}
                      to={"/faculties#" + slugifyFaculty(faculty)}
                    >
                      <i className="fas fa-info-circle"></i>&nbsp;
                      <FormattedMessage
                        id="faculties_overview.more_info"
                        defaultMessage="More info"
                      />
                    </Button>
                    <a
                      href={faculty.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      <i className="fas fa-globe-africa"></i>&nbsp;
                      <FormattedMessage
                        id="faculties_overview.website"
                        defaultMessage="Website"
                      />
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
