import React, { useState } from "react";
import { graphql } from "gatsby";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { StickyContainer, Sticky } from 'react-sticky';
import { FormattedMessage } from 'react-intl';
import { AnchorLink } from "gatsby-plugin-anchor-links";

import Layout from "../components/layout";
import Seo from "../components/seo";

import { slugifyDocumentTitle } from '../common';
import { OrderProvider } from "../components/order/order_context"
import OrderDetails from "../components/order/order_details";
import Contact from "../components/contact";

const OrderPage = ({ data, pageContext, location }) => {
  const productTitle = location.state && location.state.product;
  const product = productTitle && data.allContentfulProducts.edges.find(product => product.node.title === productTitle).node;

  const registerRulesDocuments = data.contentfulSiteInformation.registerDocuments.map((document) => "/document/"+slugifyDocumentTitle(document.title));

  return (
    <Layout site={data.contentfulSiteInformation} header="home" locale={pageContext.locale}>
      <FormattedMessage id="title.order" defaultMessage="Order">
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

      <Container>
        {product ? (
          <OrderProvider product={product} faculties={data.allContentfulFaculties} locale={pageContext.locale}>
            <OrderDetails registerRulesDocuments={registerRulesDocuments} logo={data.contentfulSiteInformation.logo} />
          </OrderProvider>
        ) : (
          <Row>
            <Col>
              <h3>
                <FormattedMessage id="order.empty" defaultMessage="Basket is empty" />
              </h3>
              <Button as={AnchorLink} to="/#Products">
                <FormattedMessage id="order.choose_product" defaultMessage="Choose product" />
              </Button>
            </Col>
          </Row>
        )}
      </Container>

      <Contact key="Contact" site={data.contentfulSiteInformation} />
    </Layout>
  )
};

export default OrderPage;

export const pageQuery = graphql`
  query OrderQuery($locale: String!) {
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
      legalDocuments {
        title
        file {
          url
        }
      }
      registerDocuments {
        title
        file {
          url
        }
      }
    }
    allContentfulProducts(
      filter: {
        node_locale: { eq: $locale }
      }
      sort: { fields: order }
    ) {
      edges {
        node {
          title
          description {
            childMarkdownRemark {
              html
            }
          }
          action
          actionName
          price {
            price
            discount
          }
          registerTitle
          registerDescription {
            childMarkdownRemark {
              html
            }
          }
          icon
          iconCount
          registerStart
          registerEnd
          product_variation {
            faculty {
              title
              country
            }
            showOn
            variations
          }
        }
      }
    }
    allContentfulFaculties(
      filter: {
        node_locale: { eq: $locale }
        showOn: { eq: $locale }
      }
      sort: { fields: title }
    ) {
      edges {
        node {
          title
          country
        }
      }
    }
  }
`;
