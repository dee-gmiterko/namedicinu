import React, { Component } from "react";
import { Container, Navbar, Nav } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import Img from "gatsby-image";
import { AnchorLink } from "gatsby-plugin-anchor-links";

export default class Header extends Component {
  render() {
    const { site } = this.props;
    return (
      <Navbar collapseOnSelect expand="lg" variant="bg-1" id="home">
        <Container>
          <Navbar.Brand as={AnchorLink} to={`/`}>
            {site.logo ? (
              <Img
                fluid={site.logo.fluid}
              />
            ) : (
              <span>{site.siteName}</span>
            )}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav">
            <i className="fa fa-lg fa-bars" aria-hidden="true"></i>
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav>

              <Nav.Link as={AnchorLink} key="Course" to={`/`} >
                <FormattedMessage id="title.course" defaultMessage="Course" />
              </Nav.Link>

              <Nav.Link as={AnchorLink} key="Faculties" to={`/faculties`} className="ml-lg-3" >
                <FormattedMessage id="title.faculties" defaultMessage="Faculties" />
              </Nav.Link>

              <Nav.Link as={AnchorLink} key="Register" to={`/#Products`} className="btn btn-primary ml-lg-4" >
                <FormattedMessage id="title.register" defaultMessage="Register" />
              </Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
