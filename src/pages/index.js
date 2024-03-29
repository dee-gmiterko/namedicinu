import React, { useState } from "react";
import { CourseSideMenu } from "../components/SideMenu";
import { graphql } from "gatsby";
import { Row, Col } from "react-bootstrap";
import { StickyContainer, Sticky } from "react-sticky";
import Banner from "../components/Banner";
import Contact from "../components/Contact";
import Course from "../components/Course";
import Layout from "../components/Layout";
import Lecture from "../components/Lecture";
import Lecturers from "../components/Lecturers";
import Products from "../components/Products";
import Seo from "../components/Seo";
import Testimonials from "../components/Testimonials";
import VisibilitySensor from "react-visibility-sensor";

const IndexPage = ({
  data: {
    contentfulSiteInformation,
    allContentfulTestimonials,
    allContentfulLecturers,
    allContentfulProducts,
  },
  pageContext: { locale },
}) => {
  const [visible, setVisible] = useState(Array(7).fill(false));

  const setVisibleIndex = (index, isVisible) => {
    let newVisible = visible.slice();
    newVisible[index] = isVisible;
    setVisible(newVisible);
  };

  return (
    <Layout site={contentfulSiteInformation} header="home" locale={locale}>
      <Seo
        lang={locale}
        siteName={contentfulSiteInformation.siteName}
        siteDescription={contentfulSiteInformation.siteDescription}
        image={"https:" + contentfulSiteInformation.logo.file.url}
        keywords={contentfulSiteInformation.siteKeywords}
      />

      <Banner site={contentfulSiteInformation}></Banner>

      <Row>
        <Col xl={2} className="d-none d-xl-block">
          <StickyContainer style={{ height: "100%" }}>
            <Sticky>
              {({ style }) => {
                return (
                  <div style={style}>
                    <CourseSideMenu visible={visible} />
                  </div>
                );
              }}
            </Sticky>
          </StickyContainer>
        </Col>
        <Col xl={10}>
          <VisibilitySensor
            onChange={(isVisible) => setVisibleIndex(0, isVisible)}
            partialVisibility={true}
            minTopValue={400}
          >
            <Course site={contentfulSiteInformation} />
          </VisibilitySensor>
          <VisibilitySensor
            onChange={(isVisible) => setVisibleIndex(1, isVisible)}
            partialVisibility={true}
            minTopValue={400}
          >
            <Lecture
              site={contentfulSiteInformation}
              locale={locale}
            />
          </VisibilitySensor>
          <VisibilitySensor
            onChange={(isVisible) => setVisibleIndex(2, isVisible)}
            partialVisibility={true}
            minTopValue={400}
          >
            <Testimonials
              site={contentfulSiteInformation}
              testimonials={allContentfulTestimonials}
            />
          </VisibilitySensor>
          <VisibilitySensor
            onChange={(isVisible) => setVisibleIndex(3, isVisible)}
            partialVisibility={true}
            minTopValue={400}
          >
            <Lecturers
              site={contentfulSiteInformation}
              lecturers={allContentfulLecturers}
            />
          </VisibilitySensor>
          <VisibilitySensor
            onChange={(isVisible) => setVisibleIndex(4, isVisible)}
            partialVisibility={true}
            minTopValue={400}
          >
            <Products
              products={allContentfulProducts}
              locale={locale}
            />
          </VisibilitySensor>
        </Col>
      </Row>

      <VisibilitySensor onChange={(isVisible) => setVisibleIndex(6, isVisible)}>
        <Contact site={contentfulSiteInformation}></Contact>
      </VisibilitySensor>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery($locale: String!) {
    contentfulSiteInformation(node_locale: { eq: $locale }) {
      siteName
      siteDescription
      siteKeywords
      fbPageId
      fbAppId
      logo {
        file {
          url
        }
        gatsbyImageData(width: 300, placeholder: NONE)
      }

      facebook
      # twitter
      instagram
      # linkdin
      # github.
      # tiktok
      email

      bannerSubtitle
      bannerDescription {
        childMarkdownRemark {
          html
        }
      }
      bannerImage {
        gatsbyImageData(width: 1000, placeholder: BLURRED)
      }
      courseDescription {
        childMarkdownRemark {
          html
        }
      }
      lectureDescription {
        childMarkdownRemark {
          html
        }
      }
      testimonialsDescription {
        childMarkdownRemark {
          html
        }
      }
      lecturersDescription {
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
      registerDocuments {
        title
        file {
          url
        }
      }
    }
    allContentfulTestimonials(
      filter: { node_locale: { eq: $locale }, showOn: { eq: $locale } }
      sort: [{ year: DESC }, { name: ASC }]
    ) {
      edges {
        node {
          name
          faculty {
            shortTitle
          }
          year
          description {
            childMarkdownRemark {
              html
            }
          }
          instagram
          facebook
        }
      }
    }
    allContentfulLecturers(
      filter: { node_locale: { eq: $locale }, showOn: { eq: $locale } }
      sort: { name: ASC }
    ) {
      edges {
        node {
          name
          designation
          description {
            childMarkdownRemark {
              html
            }
          }
          photo {
            gatsbyImageData(width: 600, placeholder: BLURRED)
          }
        }
      }
    }
    allContentfulProducts(
      filter: { node_locale: { eq: $locale } }
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
  }
`;
