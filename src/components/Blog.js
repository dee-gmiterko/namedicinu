import React from "react";
import { FormattedMessage, FormattedDate } from "react-intl";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { Row, Col } from "react-bootstrap";
import { slugifyDocumentTitle } from "../utils";

const Blog = ({ articles }) => {
  return (
    <div>
      {articles.edges.map((item, index) => (
        <Row className="blog-article">
          {item.node.image && (
            <Col md={4} className="article-image">
              <GatsbyImage image={item.node.image.gatsbyImageData} />
            </Col>
          )}
          <Col
            md={item.node.image ? 8 : undefined}
            className="position-relative"
          >
            <Link to={"/blog/" + slugifyDocumentTitle(item.node.title)}>
              <div class="bg-circle-container">
                <div class="bg-circle bg-1"></div>
              </div>
              <h3>{item.node.title}</h3>
            </Link>
            <p>
              {item.node.abstract.abstract}
              {index >= 3 && (
                <Link to={"/blog/" + slugifyDocumentTitle(item.node.title)}>
                  <span className="read-more">
                    <FormattedMessage
                      id="blog.read-more"
                      defaultMessage="Read more"
                    />
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
                <Link to={"/blog/" + slugifyDocumentTitle(item.node.title)}>
                  <span className="btn btn-primary">
                    <FormattedMessage
                      id="blog.read-more"
                      defaultMessage="Read more"
                    />
                  </span>
                </Link>
              </div>
            )}
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default Blog;
