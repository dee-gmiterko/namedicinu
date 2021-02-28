import React, { Component } from "react";
import { Container, Row, Col} from 'react-bootstrap';

export default class footer extends Component {
  render() {
    return (
      <div className="site-footer" id="footer">
        <Container>
          <Col md={12} className="p-3">
            <p class="float-right">
              <a href="#">Back to top</a>
            </p>
            <p>© {this.props.siteName}, but please download and customize it for yourself!</p>
            <p>New to Bootstrap? <a href="../../">Visit the homepage</a> or read our <a href="../../getting-started/">getting started guide</a>.</p>
          </Col>
        </Container>
      </div>
    );
  }
}
