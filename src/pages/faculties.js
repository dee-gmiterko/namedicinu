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

    <div className="spacer" style={{height: "100px"}}></div>

    {
      data.contentfulSiteInformation.menus.includes("Faculties") &&
      <FacultiesOverview key="Faculties" data={data.allContentfulFaculties} />
    }
    {
      data.contentfulSiteInformation.menus.includes("FacultiesQuiz") &&
      <FacultiesQuiz key="FacultiesQuiz" data={data.allContentfulFaculties} />
    }
    {
      data.contentfulSiteInformation.menus.includes("FacultiesComparison") &&
      <FacultiesComparison key="FacultiesComparison" data={data.allContentfulFaculties} />
    }
    {
      data.contentfulSiteInformation.menus.includes("Contact") &&
      <Contact key="Contact" data={data.contentfulSiteInformation} />
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
      contacts {
        icon
        contact
        link
      }
      bannerImage {
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
