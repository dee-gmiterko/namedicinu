import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { graphql, Link } from "gatsby";
import { slugifyDocumentTitle } from '../utils';
import Layout from "../components/Layout";
import Seo from "../components/Seo";

const DocumentListPage = ({ data: {
  contentfulSiteInformation,
  allContentfulAsset,
}, pageContext }) => {

  return (
    <Layout site={contentfulSiteInformation} header="home" locale={pageContext.locale}>
      <FormattedMessage id="title.document_list" defaultMessage="Documents">
        {(title) => (
          <Seo
            lang={pageContext.locale}
            title={title[0]}
            siteName={contentfulSiteInformation.siteName}
            siteDescription={contentfulSiteInformation.siteDescription}
            image={"https:"+contentfulSiteInformation.logo.file.url}
            keywords={contentfulSiteInformation.siteKeywords}
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
              {allContentfulAsset.edges.map((item, index) => (
                <li key={index}>
                  <Link to={"/document/"+slugifyDocumentTitle(item.node.title)}>
                    {item.node.title}
                  </Link>
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
        gatsbyImageData(width: 300, placeholder: NONE)
      }
      fbPageId
      fbAppId
      facebook
      instagram
      email
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
