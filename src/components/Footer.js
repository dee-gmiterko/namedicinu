import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { slugifyDocumentTitle } from "../utils";
import Socials from "./Socials";

export default class footer extends Component {
  shouldComponentUpdate() {
    return false; // static component
  }

  render() {
    return (
      <div className="site-footer bg-secondary" id="footer">
        <Container>
          <Row>
            <Col>
              <div className="pt-3 pb-3">
                © {new Date().getFullYear()} {this.props.site.siteName}
                <ul className="inline-list">
                  {this.props.site.legalDocuments.map((item, i) => {
                    return (
                      <li key={i}>
                        <a
                          href={"/document/" + slugifyDocumentTitle(item.title)}
                        >
                          {item.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Col>
            <Col xs={{ order: 1 }} md={"auto"}>
              <Socials
                facebook={this.props.site.facebook}
                instagram={this.props.site.instagram}
                email={this.props.site.email}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
