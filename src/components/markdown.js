import React from "react";
import PropTypes from "prop-types";

import { fixQuotes, replaceParams } from "../common";

const Markdown = ({ value, params }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: replaceParams(fixQuotes(value.childMarkdownRemark.html), params)
      }}
    />
  );
};

Markdown.propTypes = {
  value: PropTypes.shape({
    childMarkdownRemark: PropTypes.shape({
      html: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  params: PropTypes.object,
};
Markdown.defaultProps = {
  value: {
    childMarkdownRemark: {
      html: ""
    }
  }
};

export default Markdown;
