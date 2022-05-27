import React from "react";
import { graphql, Link } from "gatsby";
import { Container, Row, Col } from 'react-bootstrap';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { slugifyDocumentTitle } from '../common';

const Blog = ({ articles }) => {

  return (
    <div>
      {articles.edges.map((item, index) => (
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
  )
};

export default Blog;
