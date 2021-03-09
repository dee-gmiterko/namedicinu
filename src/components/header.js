import { Link } from "gatsby";
import React, { Component } from "react";
import { Container, Navbar, Nav } from 'react-bootstrap';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false
    };
  }

  render() {
    const { data, header } = this.props;
    const { menu } = this.state;
    return (
      <Navbar collapseOnSelect expand="lg" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="/#home">
            {data.logo.file.url ? (
              <img src={data.logo.file.url} alt="logo" />
            ) : (
              <span>{data.siteName}</span>
            )}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link as={Link} key="home" to="/#home" >
                Home
              </Nav.Link>
              {
                data.menus.includes("Faculties") &&
                <Nav.Link as={Link} key="Faculties" to={`/faculties/#Faculties`} >
                  Faculties
                </Nav.Link>
              }
              {
                data.menus.includes("Course") &&
                <Nav.Link as={Link} key="Course" to={`/#Course`} >
                  Course
                </Nav.Link>
              }
              {
                data.menus.includes("Register") &&
                <Nav.Link as={Link} key="Register" to={`/#Register`} >
                  Register
                </Nav.Link>
              }
              {
                data.menus.includes("Testimonials") &&
                <Nav.Link as={Link} key="Testimonials" to={`/#Testimonials`} >
                  Testimonials
                </Nav.Link>
              }
              {
                data.menus.includes("Lecturers") &&
                <Nav.Link as={Link} key="Lecturers" to={`/#Lecturers`} >
                  Lecturers
                </Nav.Link>
              }
              {
                data.menus.includes("Contact") &&
                <Nav.Link as={Link} key="Contact" to={`/#Contact`} >
                  Contact
                </Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
    return (
      <header className={`site-header ${menu ? "active" : ""}`}>
        <div className="container">
          <div className="header-main">
            <div className="logo">
              <Link to="/">
                {data.logo.file.url ? (
                  <img src={data.logo.file.url} alt="logo" />
                ) : (
                  <span>{data.siteName}</span>
                )}
              </Link>
            </div>
            <div
              className="responsive-menu"
              onClick={() => {
                this.setState({
                  menu: !menu
                });
              }}
            >
              <span></span>
            </div>
            <div className="menu">
              <ul
                onClick={() => {
                  this.setState({
                    menu: false
                  });
                }}
              >
                <li key="home">
                  <Link to="/#home">Home</Link>
                </li>
                {
                  data.menus.includes("Faculties") &&
                  <li key="Faculties">
                    <Link to={`/faculties/#Faculties`}>Faculties</Link>
                  </li>
                }
                {
                  data.menus.includes("Course") &&
                  <li key="Course">
                    <Link to={`/#Course`}>Course</Link>
                  </li>
                }
                {
                  data.menus.includes("Register") &&
                  <li key="Register">
                    <Link to={`/#Register`}>Register</Link>
                  </li>
                }
                {
                  data.menus.includes("Testimonials") &&
                  <li key="Testimonials">
                    <Link to={`/#Testimonials`}>Testimonials</Link>
                  </li>
                }
                {
                  data.menus.includes("Lecturers") &&
                  <li key="Lecturers">
                    <Link to={`/#Lecturers`}>Lecturers</Link>
                  </li>
                }
                {
                  data.menus.includes("Contact") &&
                  <li key="Contact">
                    <Link to={`/#Contact`}>Contact</Link>
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
