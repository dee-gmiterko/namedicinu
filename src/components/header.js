import { Link } from "gatsby";
import React, { Component } from "react";
import { Container, Navbar, Nav } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import Img from "gatsby-image";

export default class Header extends Component {
  render() {
    const { site } = this.props;
    return (
      <Navbar collapseOnSelect expand="lg" variant="bg-1" id="home">
        <Container>
          <Navbar.Brand href="/#home">
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
              <Nav.Link as={Link} key="home" to="/#home" >
                <FormattedMessage id="title.home" defaultMessage="Home" />
              </Nav.Link>
              {
                site.menus.includes("Faculties") &&
                <Nav.Link as={Link} key="Faculties" to={`/faculties/#Faculties`} >
                  <FormattedMessage id="title.faculties" defaultMessage="Faculties" />
                </Nav.Link>
              }
              {
                site.menus.includes("Course") &&
                <Nav.Link as={Link} key="Course" to={`/#Course`} >
                  <FormattedMessage id="title.course" defaultMessage="Course" />
                </Nav.Link>
              }
              {
                site.menus.includes("Testimonials") &&
                <Nav.Link as={Link} key="Testimonials" to={`/#Testimonials`} >
                  <FormattedMessage id="title.testimonials" defaultMessage="Testimonials" />
                </Nav.Link>
              }
              {
                site.menus.includes("Lecturers") &&
                <Nav.Link as={Link} key="Lecturers" to={`/#Lecturers`} >
                  <FormattedMessage id="title.lecturers" defaultMessage="Lecturers" />
                </Nav.Link>
              }
              {
                site.menus.includes("Contact") &&
                <Nav.Link as={Link} key="Contact" to={`/#Contact`} >
                  <FormattedMessage id="title.contact" defaultMessage="Contact" />
                </Nav.Link>
              }
              {
                site.menus.includes("Register") &&
                <Nav.Link as={Link} key="Register" to={`/#Register`} className="btn btn-primary ml-lg-5" >
                  <FormattedMessage id="title.register" defaultMessage="Register" />
                </Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
