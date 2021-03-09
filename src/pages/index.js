import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

import Banner from "../components/banner";
import Course from "../components/course";
import Register from "../components/register";
import Testimonials from "../components/testimonials";
import Lecturers from "../components/lecturers";
import Contact from "../components/contact";

const IndexPage = ({ data }) => (
  <Layout header="home">
    <SEO
      title={data.contentfulSiteInformation.siteName}
      keywords={[`Rohit Gupta`, `Frontend Developer`, `Developer`]}
    />
    <Banner site={data.contentfulSiteInformation}></Banner>

    {
      data.contentfulSiteInformation.menus.includes("Course") &&
      <Course key="Course" site={data.contentfulSiteInformation}></Course>
    }
    {
      data.contentfulSiteInformation.menus.includes("Register") &&
      <Register key="Register" site={data.contentfulSiteInformation} faculties={data.allContentfulFaculties}></Register>
    }
    {
      data.contentfulSiteInformation.menus.includes("Testimonials") &&
      <Testimonials key="Testimonials" site={data.contentfulSiteInformation} testimonials={data.allContentfulTestimonials}></Testimonials>
    }
    {
      data.contentfulSiteInformation.menus.includes("Lecturers") &&
      <Lecturers key="Lecturers" site={data.contentfulSiteInformation} lecturers={data.allContentfulLecturers}></Lecturers>
    }
    {
      data.contentfulSiteInformation.menus.includes("Contact") &&
      <Contact key="Contact" site={data.contentfulSiteInformation}></Contact>
    }
  </Layout>
);

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
    allContentfulTestimonials {
      edges {
        node {
          name
          subTitle
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulLecturers {
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
            fluid(maxWidth: 600) {
              base64
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
        }
      }
    }
    contentfulSiteInformation {
      siteName
      siteDescription
      menus
      fbPageId
      fbAppId

      facebook
      # twitter
      instagram
      # linkdin
      # github
      email

      bannerSubtitle
      bannerDescription {
        childMarkdownRemark {
          html
        }
      }
      bannerImage {
        fluid(maxWidth: 1000) {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
      registerDescription {
        childMarkdownRemark {
          html
        }
      }
      registerConsent {
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
    }
    allContentfulFaculties {
      edges {
        node {
          title
        }
      }
    }
  }
`;
