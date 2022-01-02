import React from "react";
import { graphql } from "gatsby";
import { Container, Row, Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { slugifyDocumentTitle } from '../common';

import Layout from "../components/layout";
import Seo from "../components/seo";


const DocumentListPage = ({ data, pageContext }) => {

  return (
    <Layout site={data.contentfulSiteInformation} header="home" locale={pageContext.locale}>
      <FormattedMessage id="title.document_list" defaultMessage="Documents">
        {(title) => (
          <Seo
            lang={pageContext.locale}
            title={title[0]}
            siteName={data.contentfulSiteInformation.siteName}
            siteDescription={data.contentfulSiteInformation.siteDescription}
            image={"https:"+data.contentfulSiteInformation.logo.file.url}
            keywords={data.contentfulSiteInformation.siteKeywords}
          />
        )}
      </FormattedMessage>
      <Container className="p-3 document-list">
        <Row>
          <Col md={3} className="p-3">
            <h2 id="Documents">
              <FormattedMessage id="title.document_list" defaultMessage="Documents" />
            </h2>
          </Col>
        </Row>
        <Row>
          <Col md={5} className="p-3">
            <ul className="checkmark">
              {data.allContentfulAsset.edges.map((item, index) => (
                <li key={index}>
                  <a href={"/document/"+slugifyDocumentTitle(item.node.title)}>
                    {item.node.title}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
};

export default DocumentListPage;

export const pageQuery = graphql`
  query DocumentsListQuery($locale: String!) {
    contentfulSiteInformation(node_locale: { eq: $locale }) {
      siteName
      siteDescription
      siteKeywords
      logo {
        file {
          url
        }
        fluid(maxWidth: 300) {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
      fbPageId
      fbAppId
      facebook
      instagram
      email
      facultiesDescription {
        childMarkdownRemark {
          html
        }
      }
      legalDocuments {
        title
        file {
          url
        }
      }
    }
    allContentfulAsset(
      filter: {
        file: {contentType: {eq: "application/pdf"}}
        node_locale: { eq: $locale }
      }
    ) {
      edges {
        node {
          title
          file {
            url
          }
        }
      }
    }
  }
`;
