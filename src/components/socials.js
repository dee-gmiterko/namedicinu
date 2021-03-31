import React from "react";
import PropTypes from "prop-types";

const Socials = ({ facebook, twitter, instagram, linkdin, github, email }) => {
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
        email &&
        <li>
          <a
            className="far fa-envelope"
            href={"mailto:"+email}
            target="_blank"
            rel="noopener noreferrer"
            style={{background: '#303030'}}
          >Email</a>
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
