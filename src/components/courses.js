import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Slider from "react-slick";
import { Link } from "gatsby";
import Img from "gatsby-image";

export default class Courses extends Component {
  render() {
    const { data } = this.props;

    return (
      <Container className="p-3">
        <Row className="justify-content-center align-items-center">
          <Col md={8} className="p-3">
            <h2 className="text-black" id="Course">Course</h2>
            <p>
              Naše kurzy ťa pripravia priamo na mieru na tú lekársku fakultu, na ktorú sa tak veľmi chceš dostať, pretože každá lekárska fakulta má svoje špecifiká. Prijímačky na každú lekársku fakultu pozostávajú z testu z biológie a chémie, ale ak sa chceš dostať do Česka, pridá sa k tomu aj fyzika. Ale pozor! Nie každá LF vyžaduje z každého predmetu rovnaké znalosti. Prijímačky na každú LF majú svoje špecifiká nielen váhou a dôležitosťou jednotlivých oblastí daných predmetov, ale aj čo sa formy testu týka. (možno odkaz na porovnanie jednotlivych LF) Preto je veľmi dôležité vedieť, čo presne sa na danú LF treba naučiť, na čo sa zamerať a ako vyzerajú testy na prijímačkách. Veď sa isto nechceš učiť dlhé hodiny niečo, čo vlastne na prijímačky ani nevyužiješ ;)
            </p>

            <p>
              Prípravné kurzy <strong>na medicínu</strong> sú práve zamerané cielene na danú LF podľa toho, ako tam vyzerajú prijímačky a čo presne sa na nich vyžaduje. Skúsení a zapálení lektori ťa od prvej lekcie vtiahnu do sveta biológie, chémie a prípadne aj fyziky a veľmi ochotne ťa prevedú celým kurzom. Priateľská a uvoľnená atmosféra sú základom každej lekcie. Zabudni na nudné hodiny v škole, kedy si sa bál čokoľvek spýtať, na týchto kurzoch ti to rozhodne nehrozí. Malé skupiny ti zaručia takmer individuálny prístup a priestor na všetky tvoje otázky. Nebaví ťa každý týždeň cestovať niekoľko hodín na iné kurzy, zabudni na to. Naše kurzy sú plne online a učiť sa môžeš bez toho, aby ste vstal z pohodlia svojej postele. Či si nočná sova alebo ranné vtáča, s nami si prídeš na svoje. Môžeš si vybrať z doobedňajších alebo večerných termínov. Chceš vedieť informácie priamo z prvej ruky? Počas kurzu máš možnosť získať skúsenosti a rady minuloročných absolventov.
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}
