import React, { Component } from "react";
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import Img from "gatsby-image";
import { Link } from "gatsby";
import moment from "moment";

export default class FacultiesOverview extends Component {
  render() {
    const { faculties } = this.props;
    return (
      <Container className="p-3">
        <Row>
          <Col md={12}>
            <h2>Faculties</h2>
          </Col>
        </Row>
        <Row className="p-1">
          {faculties.edges.map((item, index) => {
            return (
              <Col md={4}>
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
                    <Card.Title>{item.node.title}</Card.Title>
                    <Card.Text>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.node.description.childMarkdownRemark.html
                        }}
                      />
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>Cras justo odio</ListGroupItem>
                    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                    <ListGroupItem>Vestibulum at eros</ListGroupItem>
                  </ListGroup>
                  <Card.Body>
                    <Button variant="primary">Website</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
}
