import React, { useState } from "react";
import { graphql } from "gatsby";
import { Row, Col } from 'react-bootstrap';
import { StickyContainer, Sticky } from 'react-sticky';
import VisibilitySensor from 'react-visibility-sensor';

import Layout from "../components/layout";
import Seo from "../components/seo";

import Banner from "../components/banner";
import Course from "../components/course";
import Lecture from "../components/lecture";
import Testimonials from "../components/testimonials";
import Lecturers from "../components/lecturers";
import Products from "../components/products";
import Contact from "../components/contact";
import { CourseSideMenu } from "../components/side_menu";

const IndexPage = ({ data, pageContext }) => {
  const [visible, setVisible] = useState(Array(7).fill(false));

  const setVisibleIndex = (index, isVisible) => {
    let newVisible = visible.slice();
    newVisible[index] = isVisible;
    setVisible(newVisible);
  }

  return (
    <Layout site={data.contentfulSiteInformation} header="home" locale={pageContext.locale}>
      <Seo
        lang={pageContext.locale}
        siteName={data.contentfulSiteInformation.siteName}
        siteDescription={data.contentfulSiteInformation.siteDescription}
        image={"https:"+data.contentfulSiteInformation.logo.file.url}
        keywords={data.contentfulSiteInformation.siteKeywords}
      />

      <Banner site={data.contentfulSiteInformation}></Banner>

      <Row>
        <Col xl={2} className="d-none d-xl-block">
          <StickyContainer style={{height: "100%"}}>
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
          <VisibilitySensor onChange={setVisibleIndex.bind(null, 0)} partialVisibility={true} minTopValue={400}>
            <Course key="Course" site={data.contentfulSiteInformation} />
          </VisibilitySensor>
          <VisibilitySensor onChange={setVisibleIndex.bind(null, 1)} partialVisibility={true} minTopValue={400}>
            <Lecture key="Lecture" site={data.contentfulSiteInformation} locale={pageContext.locale} />
          </VisibilitySensor>
          <VisibilitySensor onChange={setVisibleIndex.bind(null, 2)} partialVisibility={true} minTopValue={400}>
            <Testimonials key="Testimonials" site={data.contentfulSiteInformation} testimonials={data.allContentfulTestimonials} />
          </VisibilitySensor>
          <VisibilitySensor onChange={setVisibleIndex.bind(null, 3)} partialVisibility={true} minTopValue={400}>
            <Lecturers key="Lecturers" site={data.contentfulSiteInformation} lecturers={data.allContentfulLecturers} />
          </VisibilitySensor>
          <VisibilitySensor onChange={setVisibleIndex.bind(null, 4)} partialVisibility={true} minTopValue={400}>
            <Products key="Products" products={data.allContentfulProducts} locale={pageContext.locale} />
          </VisibilitySensor>
        </Col>
      </Row>

      <VisibilitySensor onChange={setVisibleIndex.bind(null, 6)}>
        <Contact key="Contact" site={data.contentfulSiteInformation}></Contact>
      </VisibilitySensor>

    </Layout>
  )
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery($locale: String!) {
    contentfulSiteInformation(node_locale: {eq: $locale}) {
      siteName
      siteDescription
      siteKeywords
      fbPageId
      fbAppId
      logo {
        file {
          url
        }
        gatsbyImageData(width: 300)
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
        gatsbyImageData(width: 1000)
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
      filter: {
        node_locale: { eq: $locale }
        showOn: { eq: $locale }
      }
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
        filter: {
          node_locale: { eq: $locale }
          showOn: { eq: $locale }
        }
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
            gatsbyImageData(width: 600)
          }
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
      sort: { title: ASC }
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
