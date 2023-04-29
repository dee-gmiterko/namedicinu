import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import YouTube from 'react-youtube';
import { pixelTrackPlayLecuture } from '../fb-pixel';

import Markdown from "./markdown";

export default class Lecture extends Component {
  render() {
    const { site, locale } = this.props;
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
        {locale === "sk" ? (
          <Row>
            <Col lg={6}>
              <h3>
                <FormattedMessage id="lecture.chemistry" defaultMessage="Chemistry" />
              </h3>
              <div className="position-relative mb-3">
                <div className="lang">
                  SK
                </div>
                <YouTube
                  videoId="60_7SE6LHm8"
                  iframeClassName="width-100"
                  onPlay={pixelTrackPlayLecuture}
                />
              </div>
              <div className="position-relative mb-3">
                <div className="lang">
                  CZ
                </div>
                <YouTube
                  videoId="OfpZI-Qm-CI"
                  iframeClassName="width-100"
                  onPlay={pixelTrackPlayLecuture}
                />
              </div>
            </Col>
            <Col lg={6}>
              <h3>
                <FormattedMessage id="lecture.biology" defaultMessage="Biology" />
              </h3>
              <div className="position-relative mb-3">
                <div className="lang">
                  SK
                </div>
                <YouTube
                  videoId="7uLn29JX8DM"
                  iframeClassName="width-100"
                  onPlay={pixelTrackPlayLecuture}
                />
              </div>
              <div className="position-relative mb-3">
                <div className="lang">
                  CZ
                </div>
                <YouTube
                  videoId="tqyiuTLe15A"
                  iframeClassName="width-100"
                  onPlay={pixelTrackPlayLecuture}
                />
              </div>
            </Col>
            <Col lg={6}>
              <h3>
                <FormattedMessage id="lecture.physics" defaultMessage="Physics" />
              </h3>
              <div className="position-relative mb-3">
                <div className="lang">
                  CZ
                </div>
                <YouTube
                  videoId="X-gsQEkCVvM"
                  iframeClassName="width-100"
                  onPlay={pixelTrackPlayLecuture}
                />
              </div>
            </Col>
            <Col lg={6}>
              <h3>
                <FormattedMessage id="lecture.study_prerequisites" defaultMessage="Study Prerequisites" />
              </h3>
              <div className="position-relative mb-3">
                <div className="lang">
                  SK
                </div>
                <YouTube
                  videoId="DkfxvI8pEPU"
                  iframeClassName="width-100"
                  onPlay={pixelTrackPlayLecuture}
                />
              </div>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col lg={4}>
              <h3>
                <FormattedMessage id="lecture.chemistry" defaultMessage="Chemistry" />
              </h3>
              <div className="position-relative mb-3">
                <YouTube
                  videoId="OfpZI-Qm-CI"
                  iframeClassName="width-100"
                  onPlay={pixelTrackPlayLecuture}
                />
              </div>
            </Col>
            <Col lg={4}>
              <h3>
                <FormattedMessage id="lecture.physics" defaultMessage="Physics" />
              </h3>
              <div className="position-relative mb-3">
                <YouTube
                  videoId="X-gsQEkCVvM"
                  iframeClassName="width-100"
                  onPlay={pixelTrackPlayLecuture}
                />
              </div>
            </Col>
            <Col lg={4}>
              <h3>
                <FormattedMessage id="lecture.biology" defaultMessage="Biology" />
              </h3>
              <div className="position-relative mb-3">
                <YouTube
                  videoId="tqyiuTLe15A"
                  iframeClassName="width-100"
                  onPlay={pixelTrackPlayLecuture}
                />
              </div>
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}
