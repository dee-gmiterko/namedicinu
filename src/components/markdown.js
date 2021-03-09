import React from "react";
import PropTypes from "prop-types";

const Markdown = ({ value }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: value.childMarkdownRemark.html
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
