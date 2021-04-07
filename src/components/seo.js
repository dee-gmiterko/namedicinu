import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

function Seo({ lang, title, siteName, siteDescription, image, keywords, meta }) {
  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title ? `${title} | ${siteName}` : siteName}
      meta={[
        {
          nsame: `description`,
          content: siteDescription
        },
        {
          property: `og:title`,
          content: siteName
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
          property: `og:image`,
          content: image
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
        },
        {
          property: `twitter:image`,
          content: image
        },
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

Seo.defaultProps = {
  lang: `en`,
  keywords: [],
  meta: [],
};

Seo.propTypes = {
  lang: PropTypes.string,
  title: PropTypes.string,
  siteName: PropTypes.string,
  siteDescription: PropTypes.string,
  image: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  meta: PropTypes.array,
};

export default Seo;
