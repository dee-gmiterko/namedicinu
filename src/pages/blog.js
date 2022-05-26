import React from "react";
import { graphql, Link } from "gatsby";
import { Container, Row, Col } from 'react-bootstrap';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { slugifyDocumentTitle } from '../common';

import Layout from "../components/layout";
import Seo from "../components/seo";


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
      <Container className="p-3 blog">
        <Row>
          <Col md={3} className="p-3">
            <h2 id="Blog">
              <FormattedMessage id="title.blog" defaultMessage="Blog" />
            </h2>
          </Col>
        </Row>
        <div>
          {data.allContentfulBlog.edges.map((item, index) => (
            <Row className="blog-article">
              <Col className="p-3">
                <Link to={"/blog/"+slugifyDocumentTitle(item.node.title)}>
                  <div class="bg-circle-container">
                     <div class="bg-circle bg-1"></div>
                  </div>
                  <h3>{item.node.title}</h3>
                </Link>
                <p>
                  {item.node.abstract.abstract}
                  {index >= 3 && (
                    <Link to={"/blog/"+slugifyDocumentTitle(item.node.title)}>
                      <span className="read-more">
                        <FormattedMessage id="blog.read-more" defaultMessage="Read more" />
                      </span>
                    </Link>
                  )}
                </p>
                <p className="created-at">
                  <FormattedDate
                    value={item.node.createdAt}
                    year="numeric"
                    month="long"
                    day="numeric"
                  />
                </p>
                {index < 3 && (
                  <div className="text-right">
                    <Link to={"/blog/"+slugifyDocumentTitle(item.node.title)}>
                      <span className="btn btn-primary">
                        <FormattedMessage id="blog.read-more" defaultMessage="Read more" />
                      </span>
                    </Link>
                  </div>
                )}
              </Col>
            </Row>
          ))}
        </div>
      </Container>
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
      limit: 8
    ) {
      edges {
        node {
          title
          abstract {
            abstract
          }
          content {
            childMarkdownRemark {
              html
            }
          }
          createdAt
        }
      }
    }
  }
`;
