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

const IndexPage = ({ data, pageContext }) => (
  <Layout site={data.contentfulSiteInformation} header="home" locale={pageContext.locale}>
    <SEO
      lang={pageContext.locale}
      title="Na medicinu"
      siteName={data.contentfulSiteInformation.siteName}
      siteDescription={data.contentfulSiteInformation.siteDescription}
      image={"https:"+data.contentfulSiteInformation.logo.file.url}
      keywords={data.contentfulSiteInformation.siteKeywords}
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
  query IndexQuery($locale: String!) {
    allContentfulTestimonials(filter: { node_locale: { eq: $locale } }) {
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
    allContentfulLecturers(filter: { node_locale: { eq: $locale } }) {
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
    contentfulSiteInformation(node_locale: {eq: $locale}) {
      siteName
      siteDescription
      menus
      fbPageId
      fbAppId
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
      courseDescription {
        childMarkdownRemark {
          html
        }
      }
      registerDescription {
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
    allContentfulFaculties(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          title
          country
        }
      }
    }
  }
`;
