import { Link } from "gatsby";
import React, { Component } from "react";
import { Container, Navbar, Nav } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

export default class Header extends Component {
  render() {
    const { site } = this.props;
    return (
      <Navbar collapseOnSelect expand="lg" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="/#home">
            {site.logo.file.url ? (
              <img src={site.logo.file.url} alt="logo" />
            ) : (
              <span>{site.siteName}</span>
            )}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
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
                site.menus.includes("Register") &&
                <Nav.Link as={Link} key="Register" to={`/#Register`} >
                  <FormattedMessage id="title.register" defaultMessage="Register" />
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
