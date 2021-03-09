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
            <p>© {this.props.siteName} {new Date().getFullYear()}</p>
          </Col>
        </Container>
      </div>
    );
  }
}
