import React from "react";
import PropTypes from "prop-types";

// czech and slovak languages use those instead..
const fix_quotes = (html) => {
  return html.replace('“', '„').replace('”', '“');
}

const Markdown = ({ value }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: fix_quotes(value.childMarkdownRemark.html)
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
