import React, { Component } from "react";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { Container, Navbar, Nav } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { GatsbyImage } from "gatsby-plugin-image";

export default class Header extends Component {
  render() {
    const { site } = this.props;
    return (
      <Navbar collapseOnSelect expand="lg" variant="bg-1" id="home">
        <Container>
          <Navbar.Brand as={AnchorLink} to={`/`}>
            {site.logo ? (
              <GatsbyImage
                image={site.logo.gatsbyImageData}
                alt={site.siteName}
              />
            ) : (
              <span>{site.siteName}</span>
            )}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav">
            <i className="fa fa-lg fa-bars" aria-hidden="true"></i>
          </Navbar.Toggle>
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav.Link as={AnchorLink} to={`/`}>
                <FormattedMessage id="title.course" defaultMessage="Course" />
              </Nav.Link>

              <Nav.Link as={AnchorLink} to={`/faculties`} className="ml-lg-3">
                <FormattedMessage
                  id="title.faculties"
                  defaultMessage="Faculties"
                />
              </Nav.Link>

              <Nav.Link as={AnchorLink} to={`/fields`} className="ml-lg-3">
                <FormattedMessage
                  id="title.more_fields"
                  defaultMessage="More Fields"
                />
              </Nav.Link>

              <Nav.Link as={AnchorLink} to={`/blog`} className="ml-lg-3">
                <FormattedMessage id="title.blog" defaultMessage="Blog" />
              </Nav.Link>

              <Nav.Link
                as={AnchorLink}
                to={`/#Products`}
                className="btn btn-primary ml-lg-4"
              >
                <FormattedMessage
                  id="title.register"
                  defaultMessage="Register"
                />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
