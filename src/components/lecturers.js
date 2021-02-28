import React, { Component } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import Img from "gatsby-image";
import { Link } from "gatsby";
import moment from "moment";

export default class Lecturers extends Component {
  render() {
    const { data } = this.props;
    return (
      <Container className="p-3">
        <Row className="justify-content-center align-items-center">
          <Col md={8} className="p-3">
            <h2 className="text-black" id="Lecturers">Lecturers</h2>
            <p className="text-black pt-3">
              fermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies
              tristique nulla aliquet
            </p>
          </Col>
        </Row>
        {data.edges.map((item, index) => {
          const photo_col = (
            <Col md={4} style={{padding: "0 6%"}}>
              <div className="square">
                <Img
                  fluid={item.node.photo.fluid}
                  objectFit="cover"
                  objectPosition="50% 50%"
                  style={{
                    borderRadius: "50%",
                    border: "15px solid white",
                    boxShadow: "0 0 15px rgba(0, 0, 0, 0.06)",
                  }}
                />
              </div>
            </Col>
          )
          return (
            <Row className="p-3">
              {index % 2 == 0 && photo_col}
              <Col md={8}>
                <h3>
                  {item.node.name}
                </h3>
                {
                  item.node.designation &&
                  <p>{item.node.designation}</p>
                }
                <p
                  dangerouslySetInnerHTML={{
                    __html: item.node.description.childMarkdownRemark.html
                  }}
                />
              </Col>
              {index % 2 == 1 && photo_col}
            </Row>
          );
        })}
      </Container>
    );
  }
}
