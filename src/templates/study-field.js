import React, { useState } from "react";
import { graphql } from "gatsby";
import { Row, Col } from "react-bootstrap";
import { StickyContainer, Sticky } from "react-sticky";
import { StudyFieldSideMenu } from "../components/SideMenu";
import Contact from "../components/Contact";
import StudyFieldFacultiesOverview from "../components/StudyFieldFacultiesOverview";
import FieldsComparison from "../components/FieldsComparison";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import VisibilitySensor from "react-visibility-sensor";

const StudyFieldPage = ({
  data: { contentfulSiteInformation, contentfulStudyField },
  pageContext: { locale },
}) => {
  const [visible, setVisible] = useState(
    Array(2 + contentfulStudyField.fields.length).fill(false)
  );

  const setVisibleIndex = (index, isVisible) => {
    let newVisible = visible.slice();
    newVisible[index] = isVisible;
    setVisible(newVisible);
  };

  const fields = (
    contentfulStudyField.fields
    .filter((a) => (a.showOn || []).includes(locale))
    .sort((a, b) => a.faculty.title.localeCompare(b.faculty.title))
  );
  const faculties = (
    contentfulStudyField.fields
    .filter((a) => (a.showOn || []).includes(locale))
    .map((f) => f.faculty)
    .sort((a, b) => a.title.localeCompare(b.title))
  );

  return (
    <Layout site={contentfulSiteInformation} header="home" locale={locale}>
      <Seo
        lang={locale}
        title={contentfulStudyField.title}
        siteName={contentfulSiteInformation.siteName}
        siteDescription={contentfulSiteInformation.siteDescription}
        image={"https:" + contentfulSiteInformation.logo.file.url}
        keywords={contentfulSiteInformation.siteKeywords}
      />

      <div className="banner-spacer"></div>
      <VisibilitySensor
        onChange={(isVisible) => setVisibleIndex(0, isVisible)}
        partialVisibility={true}
        minTopValue={400}
      >
        <StudyFieldFacultiesOverview
          studyField={contentfulStudyField}
          faculties={faculties}
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
                    <StudyFieldSideMenu
                      studyField={contentfulStudyField}
                      faculties={faculties}
                      visible={visible}
                    />
                  </div>
                );
              }}
            </Sticky>
          </StickyContainer>
        </Col>
        <Col xl={10}>
          <FieldsComparison
            fields={fields}
            setVisibleIndex={(index, isVisible) =>
              setVisibleIndex(index + 2, isVisible)
            }
          />
        </Col>
      </Row>

      <VisibilitySensor
        onChange={(isVisible) =>
          setVisibleIndex(contentfulStudyField.fields.length + 1, isVisible)
        }
      >
        <Contact site={contentfulSiteInformation} />
      </VisibilitySensor>
    </Layout>
  );
};

export default StudyFieldPage;

export const pageQuery = graphql`
  query StudyFieldQuery($locale: String!, $title: String!) {
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
      legalDocuments {
        title
        file {
          url
        }
      }
    }
    contentfulStudyField(node_locale: { eq: $locale }, title: { eq: $title }) {
      title
      description {
        childMarkdownRemark {
          html
        }
      }
      fields {
        showOn
        faculty {
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
          updatedAt
        }
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
        updatedAt
      }
    }
  }
`;
