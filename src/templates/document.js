import React from "react";
import Helmet from "react-helmet";

const RedirectPage = ({ pageContext }) => {
  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: pageContext.locale,
          class: "html-fullscreen"
        }}
        title={pageContext.title}
      />
      <iframe id="included-document-frame" src={pageContext.url} />
    </>
  );
};

export default RedirectPage;
