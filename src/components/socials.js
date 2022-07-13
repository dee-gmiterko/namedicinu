import React from "react";
import { Dropdown } from 'react-bootstrap';
import PropTypes from "prop-types";
import { pixelTrackContact } from '../fb-pixel';

const Socials = ({ facebook, twitter, instagram, linkdin, tiktok, github, email }) => {
  return (
    <ul className="social">
      {
        facebook &&
        <li>
          <a
            className="fab fa-facebook-f"
            href={facebook}
            target="_blank"
            rel="noopener noreferrer"
            style={{background: '#00a2f8'}}
          >Facebook</a>
        </li>
      }
      {
        twitter &&
        <li>
          <a
            className="fab fa-twitter"
            href={twitter}
            target="_blank"
            rel="noopener noreferrer"
            style={{background: '#00a2f8'}}
          >Twitter</a>
        </li>
      }
      {
        instagram &&
        <li>
          <a
            className="fab fa-instagram"
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{background: '#f24747'}}
          >Instagram</a>
        </li>
      }
      {
        linkdin &&
        <li>
          <a
            className="fab fa-linkedin-in"
            href={linkdin}
            target="_blank"
            rel="noopener noreferrer"
            style={{background: '#00a2f8'}}
          >LinkedIn</a>
        </li>
      }
      {
        github &&
        <li>
          <a
            className="fab fa-github"
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            style={{background: '#303030'}}
          >Github</a>
        </li>
      }
      {
        tiktok &&
        <li>
          <a
            className="fab fa-tiktok"
            href={tiktok}
            target="_blank"
            rel="noopener noreferrer"
            style={{background: '#fe0151'}}
          >TikTok</a>
        </li>
      }
      {
        email &&
        <li>
          {/* Dropdown is a fallback for users without email client */}
          <Dropdown>
            <Dropdown.Toggle
              className="far fa-envelope"
              href={"mailto:"+email}
              onClick={pixelTrackContact}
              target="_blank"
              rel="noopener noreferrer"
              style={{background: '#303030', border: 'none'}}
            >
              Email
            </Dropdown.Toggle>

            <Dropdown.Menu className="p-3">
              <span className="email-text">{email}</span>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      }
    </ul>
  );
};

Socials.propTypes = {
  facebook: PropTypes.string,
  twitter: PropTypes.string,
  instagram: PropTypes.string,
  linkdin: PropTypes.string,
  github: PropTypes.string,
  email: PropTypes.string,
};

export default Socials;
