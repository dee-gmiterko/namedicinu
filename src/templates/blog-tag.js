import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { graphql } from "gatsby";
import Blog from "../components/Blog";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

const BlogPage = ({
  data: { contentfulSiteInformation, allContentfulBlog },
  pageContext,
}) => {
  return (
    <Layout
      site={contentfulSiteInformation}
      header="home"
      locale={pageContext.locale}
    >
      <Seo
        lang={pageContext.locale}
        title={pageContext.tag}
        siteName={contentfulSiteInformation.siteName}
        siteDescription={contentfulSiteInformation.siteDescription}
        image={"https:" + contentfulSiteInformation.logo.file.url}
        keywords={contentfulSiteInformation.siteKeywords}
      />
      <div className="blog-tag">
        <Container className="p-3">
          <Row>
            <Col className="p-3">
              <h2>{pageContext.tag}</h2>
            </Col>
          </Row>
          <Blog articles={allContentfulBlog} />
        </Container>
      </div>
    </Layout>
  );
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
            gatsbyImageData(width: 500, placeholder: BLURRED)
          }
        }
      }
    }
  }
`;
