import React from "react";
import { graphql } from "gatsby";
import { Container, Row, Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import Layout from "../components/layout";
import Seo from "../components/seo";

const NotFoundPage = ({ data, pageContext }) => (
  <Layout site={data.contentfulSiteInformation}>
    <FormattedMessage id="title.not_found" defaultMessage="Not found">
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

    <div className="banner-spacer"></div>

    <Container className="p-3">
      <Row>
        <Col md={12} className="p-3">
          <h1>
            <FormattedMessage id="title.not_found" defaultMessage="Not found" />
          </h1>
          <p>
            <FormattedMessage id="not_found.message" defaultMessage="You just hit a route that doesn't exist." />
          </p>
        </Col>
      </Row>
    </Container>
  </Layout>
);

export default NotFoundPage;

export const pageQuery = graphql`
  query NotFoundQuery($locale: String!) {
    contentfulSiteInformation(node_locale: {eq: $locale}) {
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
      legalDocuments {
        title
        file {
          url
        }
      }
    }
  }
`;
