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
          <Col className="p-3 text-justify">
            <h2 id="Lecture">
              <FormattedMessage id="title.lecture" defaultMessage="Lecture" />
            </h2>
            <Markdown value={site.lectureDescription} />
          </Col>
        </Row>
        <Row>
          <Col lg={4}>
            <h3>
              <FormattedMessage id="lecture.chemistry" defaultMessage="Chemistry" />
            </h3>
            <YouTube
              videoId="OfpZI-Qm-CI"
              containerClassName="embed-responsive embed-responsive-16by9"
              onPlay={pixelTrackPlayLecuture}
            />
          </Col>
          <Col lg={4}>
            <h3>
              <FormattedMessage id="lecture.physics" defaultMessage="Physics" />
            </h3>
            <YouTube
              videoId="rO2j0JCYLUE"
              containerClassName="embed-responsive embed-responsive-16by9"
              onPlay={pixelTrackPlayLecuture}
            />
          </Col>
          <Col lg={4}>
            <h3>
              <FormattedMessage id="lecture.biology" defaultMessage="Biology" />
            </h3>
            <YouTube
              videoId="tqyiuTLe15A"
              containerClassName="embed-responsive embed-responsive-16by9"
              onPlay={pixelTrackPlayLecuture}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
