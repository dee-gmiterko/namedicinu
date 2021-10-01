import React from "react";
import { graphql } from "gatsby";

const RedirectPage = ({ data, pageContext }) => {
  const document = data.contentfulSiteInformation.registerDocuments[0].file.url;
  if (typeof window !== "undefined") {
    window.location.replace(document);
  }
  return <a href={document}>Redirect to document</a>;
};

export default RedirectPage;

export const pageQuery = graphql`
  query RedirectDocumentQuery($locale: String!) {
    contentfulSiteInformation(node_locale: {eq: $locale}) {
      registerDocuments {
        file {
          url
        }
      }
    }
  }
`;
