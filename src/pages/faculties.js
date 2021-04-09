import React from "react";
import { graphql } from "gatsby";
import { FormattedMessage } from 'react-intl';

import Layout from "../components/layout";
import Seo from "../components/seo";

import FacultiesOverview from "../components/faculties_overview";
import FacultiesQuiz from "../components/faculties_quiz";
import FacultiesComparison from "../components/faculties_comparison";
import Contact from "../components/contact";


const IndexPage = ({ data, pageContext }) => (
  <Layout site={data.contentfulSiteInformation} header="home" locale={pageContext.locale}>
    <FormattedMessage id="title.faculties" defaultMessage="Faculties">
      {(title) => (
        <Seo
          lang={pageContext.locale}
          title={title}
          siteName={data.contentfulSiteInformation.siteName}
          siteDescription={data.contentfulSiteInformation.siteDescription}
          image={"https:"+data.contentfulSiteInformation.logo.file.url}
          keywords={data.contentfulSiteInformation.siteKeywords}
        />
      )}
    </FormattedMessage>

    <div className="banner-spacer"></div>

    {
      data.contentfulSiteInformation.menus.includes("Faculties") &&
      <FacultiesOverview key="Faculties" faculties={data.allContentfulFaculties} site={data.contentfulSiteInformation} />
    }
    {
      data.contentfulSiteInformation.menus.includes("FacultiesQuiz") &&
      <FacultiesQuiz key="FacultiesQuiz" quizQuestions={data.allContentfulQuizQuestion} faculties={data.allContentfulFaculties} />
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
  query FacultiesQuery($locale: String!, $faculty_country: [String!]!) {
    contentfulSiteInformation(node_locale: { eq: $locale }) {
      siteName
      siteDescription
      siteKeywords
      menus
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
      facultiesDescription {
        childMarkdownRemark {
          html
        }
      }
    }
    allContentfulFaculties(
      filter: {
        node_locale: { eq: $locale }
        country: { in: $faculty_country }
      },
      sort: { fields: title }
    ) {
      edges {
        node {
          title
          shortTitle
          shortDescription
          website
          image {
            fluid(maxWidth: 500) {
              base64
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
          dentistry
          overview
          description {
            childMarkdownRemark {
              html
            }
          }
          descriptionPanel {
            category
            key
            value
          }
          faculties_students {
            year
            dentistryAccepted
            dentistrySigned
            generalAccepted
            generalSigned
          }
          updatedAt
        }
      }
    }
    allContentfulQuizQuestion(
      filter: { node_locale: { eq: $locale } }
      sort: { fields: createdAt }
    ) {
      edges {
        node {
          question
          answerA
          resultA {
            shortTitle
          }
          answerB
          resultB {
            shortTitle
          }
        }
      }
    }
  }
`;
