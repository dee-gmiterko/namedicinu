import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { graphql } from "gatsby";
import Blog from "../components/Blog";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

const BlogPage = ({
  data: { contentfulSiteInformation, allContentfulBlog },
  pageContext: { locale },
}) => {
  return (
    <Layout site={contentfulSiteInformation} header="home" locale={locale}>
      <FormattedMessage id="title.blog" defaultMessage="Blog">
        {(title) => (
          <Seo
            lang={locale}
            title={title[0]}
            siteName={contentfulSiteInformation.siteName}
            siteDescription={contentfulSiteInformation.siteDescription}
            image={"https:" + contentfulSiteInformation.logo.file.url}
            keywords={contentfulSiteInformation.siteKeywords}
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
          <Blog articles={allContentfulBlog} />
        </Container>
      </div>
    </Layout>
  );
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
      filter: { node_locale: { eq: $locale }, showOn: { eq: $locale } }
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
