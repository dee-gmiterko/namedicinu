import { Link } from "gatsby";
import React, { Component } from "react";

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
                  data.menus.includes("Courses") &&
                  <li key="Courses">
                    <Link to={`/#Courses`}>Courses</Link>
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
