import React, { Component } from "react";
import { Container, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { Link } from "gatsby";

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
      facultiesPoints[edge.node.shortTitle] = 0;
    });
    quizQuestions.edges.forEach((item, index) => {
      if(answers.hasOwnProperty(index)) {
        const answer = answers[index];
        const result = item.node["result"+answer];
        if(result) {
          result.forEach((item) => {
            facultiesPoints[item.shortTitle] += 1;
          });
        }
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
    facultiesResults = facultiesResults.sort((a, b) => {
      var x = a.points; var y = b.points;
      return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    }).slice(0, 6);

    return (
      <div className="d-flex flex-row faculties-quiz mb-5">
        <div className="flex-grow-1" />
        <Container>
          <Row className="justify-content-center">
            <Col md={7} className="bg-2 text-center pr-5 pl-5">
              <h2 id="Quiz">
                <FormattedMessage id="title.quiz" defaultMessage="Quiz" />
              </h2>
              <Slider ref={slider => (this.sliderRef = slider)} {...sliderSettings}>
                {quizQuestions.edges.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className="question">{index+1}. {item.node.question}</div>
                      <Row as="ul" className="options">
                        <Col xs={6} as="li" className="p-5">
                          <Button onClick={this.answer.bind(this, index, "A")}>
                            {item.node.answerA}
                          </Button>
                        </Col>
                        <Col xs={6} as="li" className="p-5">
                          <Button onClick={this.answer.bind(this, index, "B")}>
                            {item.node.answerB}
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  );
                })}
                <div key="results">
                  <h3 className="results">
                    <FormattedMessage id="faculties_quiz.results" defaultMessage="Results" />
                  </h3>
                  <Container as="dl">
                    {facultiesResults.map((item, index) => {
                      return (
                        <Row key={index}>
                          <Col as="dt" xs={4} className="text-right">
                            <Link to={"/faculties#"+item.title}>{item.title}</Link>
                          </Col>
                          <Col as="dd" xs={1}>
                            {item.points}
                          </Col>
                          <Col xs={7}>
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
        <div className="flex-grow-1" />
      </div>
    );
  }
}
