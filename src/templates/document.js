import React from "react";
import Helmet from "react-helmet";

import "../css/included-document.scss";

const RedirectPage = ({ pageContext }) => {
  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: pageContext.locale,
          class: "html-fullscreen",
        }}
        title={pageContext.title}
      />
      <iframe
        id="included-document-frame"
        src={pageContext.url}
        title={pageContext.title}
      />
    </>
  );
};

export default RedirectPage;
