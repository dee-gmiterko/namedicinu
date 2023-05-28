import React, { useState } from "react";
import { FacultiesSideMenu } from "../components/SideMenu";
import { FormattedMessage } from "react-intl";
import { graphql } from "gatsby";
import { Row, Col } from "react-bootstrap";
import { StickyContainer, Sticky } from "react-sticky";
import Contact from "../components/Contact";
import FacultiesOverview from "../components/FacultiesOverview";
import FacultiesQuiz from "../components/FacultiesQuiz";
import FieldsComparison from "../components/FieldsComparison";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import VisibilitySensor from "react-visibility-sensor";

const FacultiesPage = ({
  data: {
    contentfulSiteInformation,
    allContentfulFaculties,
    allContentfulQuizQuestion,
  },
  pageContext,
}) => {
  const [visible, setVisible] = useState(
    Array(3 + allContentfulFaculties.edges.length).fill(false)
  );

  const setVisibleIndex = (index, isVisible) => {
    let newVisible = visible.slice();
    newVisible[index] = isVisible;
    setVisible(newVisible);
  };

  return (
    <Layout
      site={contentfulSiteInformation}
      header="home"
      locale={pageContext.locale}
    >
      <FormattedMessage id="title.faculties" defaultMessage="Faculties">
        {(title) => (
          <Seo
            lang={pageContext.locale}
            title={title[0]}
            siteName={contentfulSiteInformation.siteName}
            siteDescription={contentfulSiteInformation.siteDescription}
            image={"https:" + contentfulSiteInformation.logo.file.url}
            keywords={contentfulSiteInformation.siteKeywords}
          />
        )}
      </FormattedMessage>

      <div className="banner-spacer"></div>
      <VisibilitySensor
        onChange={(isVisible) => setVisibleIndex(0, isVisible)}
        partialVisibility={true}
        minTopValue={400}
      >
        <FacultiesOverview
          key="Faculties"
          faculties={allContentfulFaculties.edges.map(({ node }) => node)}
          site={contentfulSiteInformation}
        />
      </VisibilitySensor>

      <Row>
        <Col xl={2} className="d-none d-xl-block">
          <StickyContainer style={{ height: "100%" }}>
            <Sticky>
              {({ style }) => {
                return (
                  <div style={style}>
                    <FacultiesSideMenu
                      faculties={allContentfulFaculties.edges.map(
                        ({ node }) => node
                      )}
                      visible={visible}
                    />
                  </div>
                );
              }}
            </Sticky>
          </StickyContainer>
        </Col>
        <Col xl={10}>
          <VisibilitySensor
            onChange={(isVisible) => setVisibleIndex(1, isVisible)}
            partialVisibility={true}
            minTopValue={400}
          >
            <FacultiesQuiz
              key="FacultiesQuiz"
              quizQuestions={allContentfulQuizQuestion}
              faculties={allContentfulFaculties}
            />
          </VisibilitySensor>
          <FieldsComparison
            key="FacultiesComparison"
            fields={allContentfulFaculties.edges.map(({ node }) => ({
              ...node,
              faculty: node,
            }))}
            setVisibleIndex={(index, isVisible) =>
              setVisibleIndex(index + 2, isVisible)
            }
          />
        </Col>
      </Row>

      <VisibilitySensor
        onChange={(isVisible) =>
          setVisibleIndex(allContentfulFaculties.edges.length + 2, isVisible)
        }
      >
        <Contact key="Contact" site={contentfulSiteInformation} />
      </VisibilitySensor>
    </Layout>
  );
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
        gatsbyImageData(width: 300, placeholder: NONE)
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
      filter: { node_locale: { eq: $locale }, showOn: { eq: $locale } }
      sort: { title: ASC }
    ) {
      edges {
        node {
          title
          shortTitle
          shortDescription
          website
          image {
            gatsbyImageData(width: 500, placeholder: BLURRED)
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
      filter: { node_locale: { eq: $locale }, showOn: { eq: $locale } }
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
