import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

import Banner from "../components/banner";
import Courses from "../components/courses";
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
    <Banner data={data.contentfulSiteInformation}></Banner>

    {
      data.contentfulSiteInformation.menus.includes("Courses") &&
      <Courses key="Courses" data={data.allContentfulCourses}></Courses>
    }
    {
      data.contentfulSiteInformation.menus.includes("Register") &&
      <Register key="Register" data={data.allContentfulFaculties}></Register>
    }
    {
      data.contentfulSiteInformation.menus.includes("Testimonials") &&
      <Testimonials key="Testimonials" data={data.allContentfulTestimonials}></Testimonials>
    }
    {
      data.contentfulSiteInformation.menus.includes("Lecturers") &&
      <Lecturers key="Lecturers" data={data.allContentfulLecturers}></Lecturers>
    }
    {
      data.contentfulSiteInformation.menus.includes("Contact") &&
      <Contact key="Contact" data={data.contentfulSiteInformation}></Contact>
    }
  </Layout>
);

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
    allContentfulCourses {
      edges {
        node {
          name
          image {
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
      menus
      siteName
      siteDescription
      contacts {
        icon
        contact
        link
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
      siteBannerDescription {
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
