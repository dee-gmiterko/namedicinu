import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import YouTube from 'react-youtube';
import { pixelTrackPlayLecuture } from '../fb-pixel';

import Markdown from "./markdown";

export default class Products extends Component {
  render() {
    const { site } = this.props;
    return (
      <Container className="lecture">
        <Row>
          <Col md={8} className="p-3 text-justify">
            <h2 id="Lecture">
              <FormattedMessage id="title.lecture" defaultMessage="Lecture" />
            </h2>
            <Markdown value={site.lectureDescription} />
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <YouTube
              videoId="OfpZI-Qm-CI"
              containerClassName="embed-responsive embed-responsive-16by9"
              onPlay={pixelTrackPlayLecuture}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
