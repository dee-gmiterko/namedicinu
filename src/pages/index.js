import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";

import Banner from "../components/banner";
import Course from "../components/course";
import Register from "../components/register";
import Testimonials from "../components/testimonials";
import Lecturers from "../components/lecturers";
import Contact from "../components/contact";

const IndexPage = ({ data, pageContext }) => (
  <Layout site={data.contentfulSiteInformation} header="home" locale={pageContext.locale}>
    <Seo
      lang={pageContext.locale}
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
      <Register key="Register" site={data.contentfulSiteInformation} faculties={data.allContentfulFaculties} locale={pageContext.locale}></Register>
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
  query IndexQuery($locale: String!, $faculty_country: [String!]!) {
    contentfulSiteInformation(node_locale: {eq: $locale}) {
      siteName
      siteDescription
      siteKeywords
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
      registerDiscount {
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
    allContentfulTestimonials(
      filter: { node_locale: { eq: $locale } }
      sort: { fields: [year, name], order: [DESC, ASC] }
      limit: 8
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
        }
      }
    }
    allContentfulLecturers(
        filter: { node_locale: { eq: $locale } }
        sort: { fields: name }
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
    allContentfulFaculties(
      filter: {
        node_locale: { eq: $locale }
        country: { in: $faculty_country }
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
