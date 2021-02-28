import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default class Register extends Component {
  render() {
    const { data } = this.props;
    return (
      <Container className="p-3">
        <Row className="justify-content-center align-items-center">
          <Col md={12} className="p-3">
            <h2 className="text-black" id="Register">Register</h2>
            <p>
              Naše kurzy ťa pripravia priamo na mieru na tú lekársku fakultu, na ktorú sa tak veľmi chceš dostať, pretože každá lekárska fakulta má svoje špecifiká. Prijímačky na každú lekársku fakultu pozostávajú z testu z biológie a chémie, ale ak sa chceš dostať do Česka, pridá sa k tomu aj fyzika. Ale pozor! Nie každá LF vyžaduje z každého predmetu rovnaké znalosti. Prijímačky na každú LF majú svoje špecifiká nielen váhou a dôležitosťou jednotlivých oblastí daných predmetov, ale aj čo sa formy testu týka. (možno odkaz na porovnanie jednotlivych LF) Preto je veľmi dôležité vedieť, čo presne sa na danú LF treba naučiť, na čo sa zamerať a ako vyzerajú testy na prijímačkách. Veď sa isto nechceš učiť dlhé hodiny niečo, čo vlastne na prijímačky ani nevyužiješ ;)
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="p-3">
            <Form> {/* TODO add https://formspree.io/ */}
              <Form.Group controlId="registerEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="registerName">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="registerFaculty">
                <Form.Label>Chcem prípravu na fakltu</Form.Label>
                <Form.Control as="select">
                  <option value=""></option>
                  <option value="">Neviem</option>
                  {data.edges.map((item, index) => {
                    return (
                      <option value={item.node.title}>{item.node.title}</option>
                    );
                  })}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
