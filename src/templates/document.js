import React from "react";
import Helmet from "react-helmet";

import "../css/included-document.scss";

const RedirectPage = ({ pageContext: { title, url, locale } }) => {
  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: locale,
          class: "html-fullscreen",
        }}
        title={title}
      />
      <iframe id="included-document-frame" src={url} title={title} />
    </>
  );
};

export default RedirectPage;
