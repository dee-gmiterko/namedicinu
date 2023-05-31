import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link, graphql } from "gatsby";
import { Container, Row, Col, Button } from "react-bootstrap";
import { slugifyStudyField, slugifyFaculty, fixNbsp } from "../utils";
import { StickyContainer, Sticky } from "react-sticky";
import { StudyFieldsSideMenu } from "../components/SideMenu";
import Contact from "../components/Contact";
import Layout from "../components/Layout";
import Markdown from "../components/Markdown";
import Seo from "../components/Seo";
import VisibilitySensor from "react-visibility-sensor";
import { GatsbyImage } from "gatsby-plugin-image";

const FieldsPage = ({
  data: { contentfulSiteInformation: site, allContentfulStudyField },
  pageContext: { locale },
}) => {
  return (
    <Layout site={site} header="home" locale={locale}>
      <FormattedMessage id="title.fields" defaultMessage="Fields">
        {(title) => (
          <Seo
            lang={locale}
            title={title[0]}
            siteName={site.siteName}
            siteDescription={site.siteDescription}
            image={"https:" + site.logo.file.url}
            keywords={site.siteKeywords}
          />
        )}
      </FormattedMessage>

      <div className="banner-spacer"></div>

      <Row className="fields">
        <Col xl={2} className="d-none d-xl-block">
          <StickyContainer style={{ height: "100%" }}>
            <Sticky>
              {({ style }) => {
                return (
                  <div style={style}>
                    <StudyFieldsSideMenu
                      studyFields={allContentfulStudyField.edges.map(
                        ({ node: studyField }) => studyField
                      )}
                    />
                  </div>
                );
              }}
            </Sticky>
          </StickyContainer>
        </Col>
        <Col xl={10}>
          <Container className="fields-list">
            <Row>
              <Col>
                <h3 className="mt-3">
                  <FormattedMessage
                    id="title.more_fields"
                    defaultMessage="Fields"
                  />
                </h3>
                <div className="text-justify font-italic mb-5">
                  <Markdown value={site.fieldsDescription} />
                </div>
              </Col>
            </Row>
            <Row>
              {allContentfulStudyField.edges.map(
                ({ node: studyField }, index) => (
                  <Col xs={12} md={6} key={index}>
                    <Row className="pb-3">
                      <Col>
                        <Row>
                          <Col>
                            <h2 id={slugifyStudyField(studyField)}>
                              {fixNbsp(studyField.title)}
                            </h2>
                          </Col>
                        </Row>
                        {studyField.image && (
                          <Row>
                            <Col className="mb-3">
                              <GatsbyImage
                                image={studyField.image.gatsbyImageData}
                                alt={studyField.title}
                                className="width-100"
                              />
                            </Col>
                          </Row>
                        )}
                        <Row>
                          <Col className="position-relative">
                            <div className="bg-circle-container">
                              <div className="bg-circle bg-1" />
                            </div>
                            {studyField.description && (
                              <Markdown
                                value={{
                                  childMarkdownRemark: {
                                    html: studyField.description.childMarkdownRemark.html.split(
                                      /\r?\n/
                                    )[0],
                                  },
                                }}
                              />
                            )}
                          </Col>
                        </Row>
                        <Row>
                          <Col md={{ span: 3, order: 2 }}>
                            <Button
                              as={Link}
                              to={`/field/${slugifyStudyField(studyField)}`}
                            >
                              <FormattedMessage
                                id="fields.read_more"
                                defaultMessage="Read more"
                              />
                            </Button>
                          </Col>
                          <Col md={{ span: 9, order: 1 }}>
                            <p className="mb-0">
                              <FormattedMessage
                                id="fields.study_at_faculties"
                                defaultMessage="You can choose from following faculties:"
                              />
                            </p>
                            <ul>
                              {studyField.fields
                                .filter((a) =>
                                  (a.showOn || []).includes(locale)
                                )
                                .sort((a, b) =>
                                  a.faculty.title.localeCompare(b.faculty.title)
                                )
                                .slice(0, 3)
                                .map(({ faculty }) => (
                                  <li key={faculty.title}>
                                    <Link
                                      to={`/field/${slugifyStudyField(
                                        studyField
                                      )}#${slugifyFaculty(faculty)}`}
                                    >
                                      {fixNbsp(faculty.title)}
                                    </Link>
                                  </li>
                                ))}
                              {studyField.fields.filter((a) =>
                                  (a.showOn || []).includes(locale)
                                ).length > 3 && (
                                <li>
                                  <FormattedMessage
                                    id="fields.and_more"
                                    defaultMessage="And {amount} more..."
                                    values={{
                                      amount: studyField.fields.filter((a) =>
                                        (a.showOn || []).includes(locale)
                                      ).length - 3,
                                    }}
                                  />
                                </li>
                              )}
                            </ul>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                )
              )}
            </Row>
          </Container>
        </Col>
      </Row>

      <Contact site={site} />
    </Layout>
  );
};

export default FieldsPage;

export const pageQuery = graphql`
  query FieldsQuery($locale: String!) {
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
      fieldsDescription {
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
    allContentfulStudyField(
      filter: { node_locale: { eq: $locale } }
      sort: { title: ASC }
    ) {
      edges {
        node {
          title
          description {
            childMarkdownRemark {
              html
            }
          }
          image {
            gatsbyImageData(
              width: 500
              height: 250
              placeholder: BLURRED
              layout: CONSTRAINED
            )
          }
          fields {
            showOn
            faculty {
              title
              shortTitle
            }
          }
        }
      }
    }
  }
`;
