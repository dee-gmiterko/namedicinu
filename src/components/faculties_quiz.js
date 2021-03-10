import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

export default class FacultiesQuiz extends Component {
  render() {

    const quiz = (
      <Form>
        <p className="question p-5 text-center">
          ¿De quién son estos libros?
        </p>
        <div className="answers">
          <div>
            <Button type="submit">Option 1</Button>
          </div>
          <div >
            <Button type="submit">Option 2</Button>
          </div>
          <div >
            <Button type="submit">Option 3</Button>
          </div>
          <div >
            <Button type="submit">Option 4</Button>
          </div>
        </div>
      </Form>
    );

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
            {quiz}
          </Col>
        </Row>
      </Container>
    );
  }
}
