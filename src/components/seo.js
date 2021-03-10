import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

function SEO({ lang, title, siteName, siteDescription, keywords, meta }) {
  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      titleTemplate={`%s | ${siteName}`}
      meta={[
        {
          nsame: `description`,
          content: siteDescription
        },
        {
          property: `og:title`,
          content: title
        },
        {
          property: `og:description`,
          content: siteDescription
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          name: `twitter:card`,
          content: `summary`
        },
        {
          name: `twitter:title`,
          content: title
        },
        {
          name: `twitter:description`,
          content: siteDescription
        }
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `)
              }
            : []
        )
        .concat(meta)}
    >
    </Helmet>
  );
}

SEO.defaultProps = {
  lang: `en`,
  keywords: [],
  meta: [],
};

SEO.propTypes = {
  lang: PropTypes.string,
  title: PropTypes.string.isRequired,
  siteName: PropTypes.string,
  siteDescription: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  meta: PropTypes.array,
};

export default SEO;
