import React, { Component } from "react";
import { Container, Row, Col} from 'react-bootstrap';

import Socials from "./socials";

export default class footer extends Component {
  render() {
    return (
      <div className="site-footer bg-secondary" id="footer">
        <Container>
          <Row>
            <Col md={12}>
              <div className="float-right">
                <Socials facebook={this.props.site.facebook} instagram={this.props.site.instagram} email={this.props.site.email}/>
              </div>
              <p className="pt-3 pb-3">© {new Date().getFullYear()} {this.props.site.siteName}</p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
