import React from "react";
import { graphql } from "gatsby";
import { Container, Row, Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

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
            title={pageContext.tag}
            siteName={data.contentfulSiteInformation.siteName}
            siteDescription={data.contentfulSiteInformation.siteDescription}
            image={"https:"+data.contentfulSiteInformation.logo.file.url}
            keywords={data.contentfulSiteInformation.siteKeywords}
          />
        )}
      </FormattedMessage>
      <div className="blog-tag">
        <Container className="p-3">
          <Row>
            <Col md={3} className="p-3">
              <h2>{pageContext.tag}</h2>
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
  query BlogTagQuery($locale: String!, $tag: String!) {
    contentfulSiteInformation(node_locale: { eq: $locale }) {
      siteName
      siteDescription
      siteKeywords
      logo {
        file {
          url
        }
        gatsbyImageData(width: 300)
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
        showOn: { eq: $locale }
        tags: { eq: $tag }
      }
      sort: { createdAt: DESC }
    ) {
      edges {
        node {
          title
          abstract {
            abstract
          }
          createdAt
          image {
            gatsbyImageData(width: 500)
          }
        }
      }
    }
  }
`;
