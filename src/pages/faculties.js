import React, { useState } from "react";
import { graphql } from "gatsby";
import { Row, Col } from 'react-bootstrap';
import { StickyContainer, Sticky } from 'react-sticky';
import { FormattedMessage } from 'react-intl';
import VisibilitySensor from 'react-visibility-sensor';

import Layout from "../components/layout";
import Seo from "../components/seo";

import FacultiesOverview from "../components/faculties_overview";
import FacultiesQuiz from "../components/faculties_quiz";
import FacultiesComparison from "../components/faculties_comparison";
import Contact from "../components/contact";
import { FacultiesSideMenu } from "../components/side_menu";

const FacultiesPage = ({ data, pageContext }) => {
  const [visible, setVisible] = useState(Array(3 + data.allContentfulFaculties.edges.length).fill(false));

  const setVisibleIndex = (index, isVisible) => {
    let newVisible = visible.slice();
    newVisible[index] = isVisible;
    setVisible(newVisible);
  }

  return (
    <Layout site={data.contentfulSiteInformation} header="home" locale={pageContext.locale}>
      <FormattedMessage id="title.faculties" defaultMessage="Faculties">
        {(title) => (
          <Seo
            lang={pageContext.locale}
            title={title[0]}
            siteName={data.contentfulSiteInformation.siteName}
            siteDescription={data.contentfulSiteInformation.siteDescription}
            image={"https:"+data.contentfulSiteInformation.logo.file.url}
            keywords={data.contentfulSiteInformation.siteKeywords}
          />
        )}
      </FormattedMessage>

      <div className="banner-spacer"></div>
      <VisibilitySensor onChange={setVisibleIndex.bind(null, 0)} partialVisibility={true} minTopValue={400}>
        <FacultiesOverview key="Faculties" faculties={data.allContentfulFaculties} site={data.contentfulSiteInformation} />
      </VisibilitySensor>

      <Row>
        <Col xl={2} className="d-none d-xl-block">
          <StickyContainer style={{height: "100%"}}>
            <Sticky>
              {({ style }) => {
                return (
                  <div style={style}>
                    <FacultiesSideMenu faculties={data.allContentfulFaculties} visible={visible} />
                  </div>
                );
              }}
            </Sticky>
          </StickyContainer>
        </Col>
        <Col xl={10}>
          <VisibilitySensor onChange={setVisibleIndex.bind(null, 1)} partialVisibility={true} minTopValue={400}>
            <FacultiesQuiz key="FacultiesQuiz" quizQuestions={data.allContentfulQuizQuestion} faculties={data.allContentfulFaculties} />
          </VisibilitySensor>
          <FacultiesComparison key="FacultiesComparison" faculties={data.allContentfulFaculties} setVisibleIndex={(index, isVisible) => setVisibleIndex(index+2, isVisible)} />
        </Col>
      </Row>

      <VisibilitySensor onChange={setVisibleIndex.bind(null, data.allContentfulFaculties.edges.length+2)}>
        <Contact key="Contact" site={data.contentfulSiteInformation} />
      </VisibilitySensor>

    </Layout>
  )
};

export default FacultiesPage;

export const pageQuery = graphql`
  query FacultiesQuery($locale: String!) {
    contentfulSiteInformation(node_locale: { eq: $locale }) {
      siteName
      siteDescription
      siteKeywords
      logo {
        file {
          url
        }
        gatsbyImageData(width: 300)
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
      legalDocuments {
        title
        file {
          url
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
          shortTitle
          shortDescription
          website
          image {
            gatsbyImageData(width: 500)
          }
          dentistry
          oralInterview
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
      filter: {
        node_locale: { eq: $locale }
        showOn: { eq: $locale }
      }
      sort: { createdAt: ASC }
    ) {
      edges {
        node {
          question
          answerA
          resultA {
            title
          }
          answerB
          resultB {
            title
          }
          answerC
          resultC {
            title
          }
        }
      }
    }
  }
`;
