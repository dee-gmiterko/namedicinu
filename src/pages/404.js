import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

const NotFoundPage = ({
  data: { contentfulSiteInformation },
  pageContext: { locale },
}) => (
  <Layout site={contentfulSiteInformation}>
    <FormattedMessage id="title.not_found" defaultMessage="Not found">
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

    <div className="banner-spacer"></div>

    <Container className="p-3">
      <Row>
        <Col className="p-3">
          <h1>
            <FormattedMessage id="title.not_found" defaultMessage="Not found" />
          </h1>
          <p>
            <FormattedMessage
              id="not_found.message"
              defaultMessage="You just hit a route that doesn't exist."
            />
          </p>
        </Col>
      </Row>
    </Container>
  </Layout>
);

export default NotFoundPage;

export const pageQuery = graphql`
  query NotFoundQuery($locale: String!) {
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
      legalDocuments {
        title
        file {
          url
        }
      }
    }
  }
`;
