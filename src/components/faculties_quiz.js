import React, { Component } from "react";
import { Container, Row, Col, Form, Button, ProgressBar } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";

var sliderSettings = {
  arrows: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false,
};

export default class FacultiesQuiz extends Component {

  constructor(props) {
    super(props);
    this.sliderRef = null;
    this.state = {
      answers: {}
    }
  }

  answer(index, option) {
    this.setState({
      answers: Object.assign(this.state.answers, {
        [index]: option
      })
    });
    this.sliderRef.slickNext()
  }

  render() {
    const { quizQuestions, faculties } = this.props;
    const { answers } = this.state;

    // count points
    let facultiesPoints = {};
    faculties.edges.forEach((edge, index) => {
      facultiesPoints[edge.node.title] = 0;
    });
    quizQuestions.edges.forEach((item, index) => {
      if(answers.hasOwnProperty(index)) {
        const answer = answers[index];
        item.node["result"+answer].forEach((item) => {
          facultiesPoints[item.title] += 1;
        });
      }
    });

    // calculate and sort results
    const maxPoints = Object.keys(facultiesPoints)
      .map(item => facultiesPoints[item])
      .reduce((a, b) => {
      return Math.max(a, b);
    }, 1);
    let facultiesResults = Object.keys(facultiesPoints).map((title) => {
      return {
        "title": title,
        "points": facultiesPoints[title],
        "result": (facultiesPoints[title] / maxPoints) * 100,
      }
    });
    facultiesResults.sort((a, b) => {
      var x = a.points; var y = b.points;
      return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });

    return (
      <Container className="p-3 faculties-quiz">
        <Row>
          <Col md={12}>
            <h2 id="Quiz">
              <FormattedMessage id="title.quiz" defaultMessage="Quiz" />
            </h2>
          </Col>
        </Row>
        <Row className="p-1">
          <Col md={12}>
            <Slider ref={slider => (this.sliderRef = slider)} {...sliderSettings}>
              {quizQuestions.edges.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="question">{item.node.question}</div>
                    <ul>
                      <li>
                        <Button onClick={this.answer.bind(this, index, "A")}>
                          {item.node.answerA}
                        </Button>
                      </li>
                      <li>
                        <Button onClick={this.answer.bind(this, index, "B")}>
                          {item.node.answerB}
                        </Button>
                      </li>
                    </ul>
                  </div>
                );
              })}
              <div key="results">
                <h3 className="results">Results</h3>
                <Container as="dl">
                  {facultiesResults.map((item, index) => {
                    return (
                      <Row key={index}>
                        <Col as="dt" xs={5}>
                          {item.title}
                        </Col>
                        <Col as="dd" xs={1}>
                          {item.points}
                        </Col>
                        <Col xs={6}>
                          <ProgressBar now={item.result} />
                        </Col>
                      </Row>
                    );
                  })}
                </Container>
              </div>
            </Slider>
          </Col>
        </Row>
      </Container>
    );
  }
}
