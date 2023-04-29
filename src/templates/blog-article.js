import React from "react";
import { graphql, Link } from "gatsby";
import { Container, Row, Col } from 'react-bootstrap';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { slugifyDocumentTitle } from '../common';
import { GatsbyImage } from "gatsby-plugin-image";

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
      {article.image && (
        <p className="article-background-image">
          <GatsbyImage image={article.image.gatsbyImageData} />
        </p>
      )}
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
                <Link to={"/blog/tag/"+slugifyDocumentTitle(tag)}>
                  <span className="tag">
                    {tag}
                  </span>
                </Link>
              ))}
            </Col>
          </Row>
        </div>
        {data.allContentfulBlog.edges.length > 0 && (
          <>
            <Row>
              <Col md={6} className="mt-3">
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
                  {item.node.image && (
                    <p className="article-image">
                      <GatsbyImage image={item.node.image.gatsbyImageData} />
                    </p>
                  )}
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
          </>
        )}
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
      image {
        gatsbyImageData(width: 1600)
      }
    }
    allContentfulBlog(
      filter: {
        node_locale: { eq: $locale }
        tags: { in: $tags }
        title: { ne: $title }
      }
      sort: { createdAt: DESC }
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
          image {
            gatsbyImageData(width: 500)
          }
        }
      }
    }
  }
`;
