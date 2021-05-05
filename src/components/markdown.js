import React from "react";
import PropTypes from "prop-types";

import { fixQuotes } from "../common";

const Markdown = ({ value }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: fixQuotes(value.childMarkdownRemark.html)
      }}
    />
  );
};

Markdown.propTypes = {
  value: PropTypes.shape({
    childMarkdownRemark: PropTypes.shape({
      html: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};
Markdown.defaultProps = {
  value: {
    childMarkdownRemark: {
      html: ""
    }
  }
};

export default Markdown;
