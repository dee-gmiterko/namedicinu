import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Slider from "react-slick";
import { Link } from "gatsby";
import Img from "gatsby-image";

export default class Course extends Component {
  render() {
    const { data } = this.props;

    return (
      <Container className="p-3">
        <Row className="justify-content-center align-items-center">
          <Col md={12} className="p-3">
            <h2 className="text-black" id="Course">Course</h2>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="p-3">
            <p className="text-justify">
              Naše kurzy ťa pripravia priamo na mieru na tú lekársku fakultu, na ktorú sa tak veľmi chceš dostať, pretože každá lekárska fakulta má svoje špecifiká. Prijímačky na každú lekársku fakultu pozostávajú z testu z biológie a chémie, ale ak sa chceš dostať do Česka, pridá sa k tomu aj fyzika. Ale pozor! Nie každá LF vyžaduje z každého predmetu rovnaké znalosti. Prijímačky na každú LF majú svoje špecifiká nielen váhou a dôležitosťou jednotlivých oblastí daných predmetov, ale aj čo sa formy testu týka. Preto je veľmi dôležité vedieť, čo presne sa na danú LF treba naučiť, na čo sa zamerať a ako vyzerajú testy na prijímačkách. Veď sa isto nechceš učiť dlhé hodiny niečo, čo vlastne na prijímačky ani nevyužiješ ;)
            </p>
          </Col>
          <Col md={6} className="p-3">
            <p className="text-justify">
              Prípravné kurzy NA MEDICÍNU sú práve zamerané cielene na danú LF podľa toho, ako tam vyzerajú prijímačky a čo presne sa na nich vyžaduje. Skúsení a zapálení lektori ťa od prvej lekcie vtiahnu do sveta biológie, chémie a prípadne aj fyziky a veľmi ochotne ťa prevedú celým kurzom. Priateľská a uvoľnená atmosféra sú základom každej lekcie. Zabudni na nudné hodiny v škole, kedy si sa bál čokoľvek spýtať, na týchto kurzoch ti to rozhodne nehrozí. Malé skupiny ti zaručia takmer individuálny prístup a priestor na všetky tvoje otázky. Nebaví ťa každý týždeň cestovať niekoľko hodín na iné kurzy, zabudni na to. Naše kurzy sú plne online a učiť sa môžeš bez toho, aby ste vstal z pohodlia svojej postele. Či si nočná sova alebo ranné vtáča, s nami si prídeš na svoje. Môžeš si vybrať z doobedňajších alebo večerných termínov. Chceš vedieť informácie priamo z prvej ruky? Počas kurzu máš možnosť získať skúsenosti a rady minuloročných absolventov.
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={4} className="d-flex justify-content-center align-items-center">
            <div className="p-3"><i className="fas fa-3x fa-bullseye"></i></div>
            <div>Cielene na zvolenú LF</div>
          </Col>
          <Col md={4} className="d-flex justify-content-center align-items-center">
            <div className="p-3"><i className="fas fa-3x fa-map-marker-alt"></i></div>
            <div>Prebieha online</div>
          </Col>
          <Col md={4} className="d-flex justify-content-center align-items-center">
            <div className="p-3"><i className="fas fa-3x fa-wallet"></i></div>
            <div>3,3 €/hodina (60 minút)</div>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="p-3">
            <h3>Štruktura kurzu</h3>
            <ul className="text-justify">
              <li>každý týždeň ťa čaká jedna lekcia biológie a chémie (do Česka aj fyziky)</li>
              <li>jedna lekcia trvá 3 hodiny = 180 minút (nič sa neboj, samozrejme budú aj prestávky 🙂)</li>
              <li>spolu 33 lekcií z každého predmetu – 99 hodín biológie + 99 chémie (do Česka aj 99 fyziky)</li>
              <li>na záver kurzy si vyskúšaš prijímačky nanečisto, aby ťa na tých skutočných nič neprekvapilo</li>
            </ul>
          </Col>
          <Col md={6} className="p-3">
            <h3>Priebeh hodiny</h3>
            <ul className="text-justify">
              <li>jeden deň v týždni sa pravidelne vyučuje len jeden predmet</li>
              <li>vybrať si môžeš z doobedňajších alebo večerných kurzov (9:00&nbsp;–&nbsp;12:20 alebo 16:40&nbsp;–&nbsp;20:00)</li>
              <li>za 99 hodín prejdeme každý predmet úplne od základov presne namieru pre tebou zvolenú LF</li>
              <li>na každej lekcii Ti lektor zábavnou a zrozumiteľnou formou vysvetlí dané učivo</li>
              <li>následne si rozoberiete k danej téme aj modelovky</li>
              <li>súčasťou kurzu sú aj cvičné testy</li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h3>Výhody online kurzu</h3>
          </Col>
          <Col md={4} className="d-flex flex-column align-items-stretch">
            <h4 className="text-center">Pohodlie domova</h4>
            <p className="text-justify">Všetky lekcie môžeš absolvovať z pohodia svojej izby (alebo aj postele, ak  chceš 🙂) a nemusíš strácať čas cestovaním</p>
          </Col>
          <Col md={4} className="d-flex flex-column align-items-stretch">
            <h4 className="text-center">Nahravky</h4>
            <p className="text-justify">Všetky lekcie sú nahrávané, takže sa k nim môžeš znova vrátiť</p>
          </Col>
          <Col md={4} className="d-flex flex-column align-items-stretch">
            <h4 className="text-center">Vždy k dispozícii</h4>
            <p className="text-justify">lektori sú ti vždy k dispozícii a môžeš im akékoľvek otázky napísať cez Messenger (samozrejme, že aj mimo času lekcií)</p>
          </Col>
        </Row>
      </Container>
    );
  }
}
