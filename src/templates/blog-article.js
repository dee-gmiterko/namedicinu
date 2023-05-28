import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FormattedMessage, FormattedDate } from "react-intl";
import { GatsbyImage } from "gatsby-plugin-image";
import { graphql, Link } from "gatsby";
import { slugifyDocumentTitle } from "../utils";
import Layout from "../components/Layout";
import Markdown from "../components/Markdown";
import Seo from "../components/Seo";

const BlogArticlePage = ({
  data: { contentfulSiteInformation, contentfulBlog, allContentfulBlog },
  pageContext,
}) => {
  const article = contentfulBlog;

  return (
    <Layout
      site={contentfulSiteInformation}
      header="home"
      locale={pageContext.locale}
    >
      <Seo
        lang={pageContext.locale}
        title={article.title}
        siteName={contentfulSiteInformation.siteName}
        siteDescription={contentfulSiteInformation.siteDescription}
        image={"https:" + contentfulSiteInformation.logo.file.url}
        keywords={contentfulSiteInformation.siteKeywords}
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
              {article.tags.map((tag) => (
                <Link to={"/blog/tag/" + slugifyDocumentTitle(tag)}>
                  <span className="tag">{tag}</span>
                </Link>
              ))}
            </Col>
          </Row>
        </div>
        {allContentfulBlog.edges.length > 0 && (
          <>
            <Row>
              <Col md={6} className="mt-3">
                <h2>
                  <FormattedMessage
                    id="blog.related_articles"
                    defaultMessage="Related articles"
                  />
                </h2>
              </Col>
            </Row>
            <Row>
              {allContentfulBlog.edges.map((item, index) => (
                <Col md={4} className="related-article p-3">
                  <Link to={"/blog/" + slugifyDocumentTitle(item.node.title)}>
                    <h3>{item.node.title}</h3>
                  </Link>
                  {item.node.image && (
                    <p className="article-image">
                      <GatsbyImage image={item.node.image.gatsbyImageData} />
                    </p>
                  )}
                  <p>{item.node.abstract.abstract}</p>
                  <div className="text-right">
                    <Link to={"/blog/" + slugifyDocumentTitle(item.node.title)}>
                      <span className="btn btn-primary">
                        <FormattedMessage
                          id="blog.read-more"
                          defaultMessage="Read more"
                        />
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
  );
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
    contentfulBlog(node_locale: { eq: $locale }, title: { eq: $title }) {
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
        gatsbyImageData(width: 1200, height: 400, placeholder: BLURRED)
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
            gatsbyImageData(width: 500, height: 250, placeholder: BLURRED)
          }
        }
      }
    }
  }
`;
