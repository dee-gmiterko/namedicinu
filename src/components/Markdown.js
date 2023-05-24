import React from "react";
import { fixAll, replaceParams } from "../utils";
import PropTypes from "prop-types";

const Markdown = ({ value, params }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: replaceParams(fixAll(value.childMarkdownRemark.html), params)
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
