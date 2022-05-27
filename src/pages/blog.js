import React from "react";
import { graphql, Link } from "gatsby";
import { Container, Row, Col } from 'react-bootstrap';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { slugifyDocumentTitle } from '../common';

import Layout from "../components/layout";
import Seo from "../components/seo";
import Blog from "../components/blog";

const BlogPage = ({ data, pageContext }) => {

  return (
    <Layout site={data.contentfulSiteInformation} header="home" locale={pageContext.locale}>
      <FormattedMessage id="title.blog" defaultMessage="Blog">
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
      <div className="blog">
        <Container className="p-3">
          <Row>
            <Col md={3} className="p-3">
              <h2 id="Blog">
                <FormattedMessage id="title.blog" defaultMessage="Blog" />
              </h2>
            </Col>
          </Row>
          <Blog articles={data.allContentfulBlog} />
        </Container>
      </div>
    </Layout>
  )
};

export default BlogPage;

export const pageQuery = graphql`
  query BlogQuery($locale: String!) {
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
    allContentfulBlog(
      filter: {
        node_locale: { eq: $locale }
      }
      sort: {fields: [createdAt], order: [DESC]}
    ) {
      edges {
        node {
          title
          abstract {
            abstract
          }
          createdAt
          image {
            fluid(maxWidth: 500) {
              base64
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
        }
      }
    }
  }
`;
