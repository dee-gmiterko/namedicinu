import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

import FacultiesOverview from "../components/faculties_overview";
import FacultiesQuiz from "../components/faculties_quiz";
import FacultiesComparison from "../components/faculties_comparison";
import Contact from "../components/contact";

const IndexPage = ({ data }) => (
  <Layout header="home">
    <SEO
      title={data.contentfulSiteInformation.siteName}
      keywords={[`Rohit Gupta`, `Frontend Developer`, `Developer`]}
    />

    <div className="banner-spacer"></div>

    {
      data.contentfulSiteInformation.menus.includes("Faculties") &&
      <FacultiesOverview key="Faculties" faculties={data.allContentfulFaculties} />
    }
    {
      data.contentfulSiteInformation.menus.includes("FacultiesQuiz") &&
      <FacultiesQuiz key="FacultiesQuiz" />
    }
    {
      data.contentfulSiteInformation.menus.includes("FacultiesComparison") &&
      <FacultiesComparison key="FacultiesComparison" faculties={data.allContentfulFaculties} />
    }
    {
      data.contentfulSiteInformation.menus.includes("Contact") &&
      <Contact key="Contact" site={data.contentfulSiteInformation} />
    }
  </Layout>
);

export default IndexPage;

export const pageQuery = graphql`
  query FacultiesQuery {
    contentfulSiteInformation {
      menus
      siteName
      siteDescription
      email
      fbPageId
      fbAppId
    }
    allContentfulFaculties {
      edges {
        node {
          title
          description {
            childMarkdownRemark {
              html
            }
          }
          image {
            fluid(maxWidth: 500) {
              src
            }
          }
        }
      }
    }
  }
`;
