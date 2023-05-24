import React from "react";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { graphql } from "gatsby";
import { OrderProvider } from "../components/order/OrderContext"
import { slugifyDocumentTitle } from '../utils';
import Contact from "../components/Contact";
import Layout from "../components/Layout";
import OrderLayout from "../components/order/OrderLayout";
import Seo from "../components/Seo";

const OrderPage = ({ data: {
  contentfulSiteInformation,
  allContentfulProducts,
  allContentfulFaculties,
  allContentfulPaymentFrequency, 
}, pageContext, location }) => {
  const productTitle = location.state && location.state.product;
  const product = productTitle && allContentfulProducts.edges.find(product => product.node.title === productTitle).node;

  const registerRulesDocuments = contentfulSiteInformation.registerDocuments.map((document) => "/document/"+slugifyDocumentTitle(document.title));

  return (
    <Layout site={contentfulSiteInformation} header="home" locale={pageContext.locale}>
      <FormattedMessage id="title.order" defaultMessage="Order">
        {(title) => (
          <Seo
            lang={pageContext.locale}
            title={title[0]}
            siteName={contentfulSiteInformation.siteName}
            siteDescription={contentfulSiteInformation.siteDescription}
            image={"https:"+contentfulSiteInformation.logo.file.url}
            keywords={contentfulSiteInformation.siteKeywords}
          />
        )}
      </FormattedMessage>

      <div className="banner-spacer-order"></div>

      <Container>
        {product ? (
          <div className="order">
            <OrderProvider product={product} faculties={allContentfulFaculties} locale={pageContext.locale} paymentFrequencies={allContentfulPaymentFrequency}>
              <OrderLayout site={contentfulSiteInformation} registerRulesDocuments={registerRulesDocuments} />
            </OrderProvider>
          </div>
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

      <Contact key="Contact" site={contentfulSiteInformation} />
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
      sort: { order: ASC }
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
            deposit
          }
          registerTitle
          registerDescription {
            childMarkdownRemark {
              html
            }
          }
          priceDescription {
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
      sort: { title: ASC }
    ) {
      edges {
        node {
          title
          country
        }
      }
    }
    allContentfulPaymentFrequency(
      filter: {
        node_locale: { eq: $locale }
      }
      sort: { order: ASC }
    ) {
      edges {
        node {
          title
          message {
            childMarkdownRemark {
              html
            }
          }
          portions
        }
      }
    }
  }
`;
