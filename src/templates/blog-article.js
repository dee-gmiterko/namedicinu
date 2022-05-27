import React from "react";
import { graphql, Link } from "gatsby";
import { Container, Row, Col } from 'react-bootstrap';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { slugifyDocumentTitle } from '../common';

import Layout from "../components/layout";
import Seo from "../components/seo";
import Markdown from "../components/markdown";


const BlogArticlePage = ({ data, pageContext }) => {
  const article = data.contentfulBlog;

  return (
    <Layout site={data.contentfulSiteInformation} header="home" locale={pageContext.locale}>
      <Seo
        lang={pageContext.locale}
        title={article.title}
        siteName={data.contentfulSiteInformation.siteName}
        siteDescription={data.contentfulSiteInformation.siteDescription}
        image={"https:"+data.contentfulSiteInformation.logo.file.url}
        keywords={data.contentfulSiteInformation.siteKeywords}
      />
      <Container>
        <div className="blog-article">
          <Row>
            <Col className="p-3">
              <h2>{article.title}</h2>
            </Col>
          </Row>
          <Row>
            <Col className="p-3">
              <Markdown value={article.content} />
              <p className="created-at">
                <FormattedDate
                  value={article.createdAt}
                  year="numeric"
                  month="long"
                  day="numeric"
                />
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="p-3">
              {article.tags.map(tag => (
                <span className="tag">
                  {tag}
                </span>
              ))}
            </Col>
          </Row>
        </div>
        <Row>
          <Col md={6} className="mt-5">
            <h2>
              <FormattedMessage id="blog.related_articles" defaultMessage="Related articles" />
            </h2>
          </Col>
        </Row>
        <Row>
          {data.allContentfulBlog.edges.map((item, index) => (
            <Col md={4} className="related-article p-3">
              <Link to={"/blog/"+slugifyDocumentTitle(item.node.title)}>
                <h3>{item.node.title}</h3>
              </Link>
              <p>
                {item.node.abstract.abstract}
              </p>
              <div className="text-right">
                <Link to={"/blog/"+slugifyDocumentTitle(item.node.title)}>
                  <span className="btn btn-primary">
                    <FormattedMessage id="blog.read-more" defaultMessage="Read more" />
                  </span>
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  )
};

export default BlogArticlePage;

export const pageQuery = graphql`
  query BlogArticleQuery($locale: String!, $title: String!, $tags: [String]!) {
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
    contentfulBlog(
      node_locale: { eq: $locale }
      title: { eq: $title }
    ) {
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
      tags
    }
    allContentfulBlog(
      filter: {
        node_locale: { eq: $locale }
        tags: { in: $tags }
        title: { ne: $title }
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
