import React, { Component } from "react";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { FormattedMessage, FormattedDate, FormattedNumber } from 'react-intl';
import { Row, Col, Card, ListGroup, ListGroupItem, Table, Button } from 'react-bootstrap';
import { slugifyFaculty, fixNbsp } from '../utils';
import Markdown from "./Markdown";

export default class FieldDetail extends Component {
  shouldComponentUpdate() {
    return false; // static component
  }

  render() {
    const { field } = this.props;

    let descriptionPanelCategories = {};
    field.descriptionPanel.forEach((item) => {
      if(!descriptionPanelCategories.hasOwnProperty(item.category)) {
        descriptionPanelCategories[item.category] = {
          titleValue: null,
          items: [],
        };
      }
      if(item.key) {
        descriptionPanelCategories[item.category].items.push({
          key: item.key,
          value: (
            item.value ? fixNbsp(item.value) : null
          ),
        });
      } else {
        descriptionPanelCategories[item.category].titleValue = (
          item.value ? fixNbsp(item.value) : null
        );
      }
    });

    const simpleWebsiteRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/g;

    descriptionPanelCategories["Web"] = {
      titleValue: (
        <a href={field.faculty.website} target="_blank" rel="noopener noreferrer">
          <i className="fas fa-globe-africa"></i>&nbsp;
          {simpleWebsiteRegex.exec(field.faculty.website)[1]}
        </a>
      ),
      items: [],
    };

    const descriptionPanelItems = Object.keys(descriptionPanelCategories).map((categoryTitle, index) => {
      let category = descriptionPanelCategories[categoryTitle]
      return (
        <ListGroupItem key={index}>
          <Row noGutters={true}>
            <Col as="dt" xs={4}>
              <em>{categoryTitle}</em>
            </Col>
            <Col as="dd" xs={8}>
              {category.titleValue}
            </Col>
          </Row>
          {category.items.map((item, index) => {
            return (
              <Row key={index} noGutters={true}>
                <Col as="dt" xs={4}>
                  <i className="fas fa-circle" />&nbsp;&nbsp;{item.key}
                </Col>
                <Col as="dd" xs={8}>
                  {item.value}
                </Col>
              </Row>
            )
          })}
        </ListGroupItem>
      );
    });

    let facultyStudents = null;
    if(field.faculties_students) {
      facultyStudents = (
        <Table responsive bordered size="sm" className="text-center students">
          <thead>
            <tr>
              <th>
                {
                  !field.faculty.dentistry &&
                  <FormattedMessage id="faculties_comparison.students.year" defaultMessage="Year" />
                }
              </th>
              <th colSpan={2}>
                <FormattedMessage id="faculties_comparison.students.signed" defaultMessage="Signerd" />
              </th>
              <th colSpan={2}>
                <FormattedMessage id="faculties_comparison.students.accepted" defaultMessage="Accepted" />
              </th>
            </tr>
            {
              field.faculty.dentistry &&
              <tr>
                <th>
                  <FormattedMessage id="faculties_comparison.students.year" defaultMessage="Year" />
                </th>
                <th>
                  <FormattedMessage id="faculties_comparison.students.general" defaultMessage="General" />
                </th>
                <th>
                  <FormattedMessage id="faculties_comparison.students.dentistry" defaultMessage="Dentistry" />
                </th>
                {
                  field.faculty.dentistry &&
                  <>
                    <th>
                      <FormattedMessage id="faculties_comparison.students.general" defaultMessage="General" />
                    </th>
                    <th>
                      <FormattedMessage id="faculties_comparison.students.dentistry" defaultMessage="Dentistry" />
                    </th>
                  </>
                }
              </tr>
            }
          </thead>
          <tbody>
            {field.faculties_students
              .sort((a, b) => {
                var x = a.year; var y = b.year;
                return ((x < y) ? 1 : ((x > y) ? -1 : 0));
              })
              .slice(0, 3)
              .map((students, index) => {
              const fourColumns = (students.dentistrySigned || students.dentistryAccepted)
              return (
                <tr key={index}>
                  <th>{students.year}</th>
                  <td colSpan={fourColumns ? 1 : 2}>
                    {
                      students.generalSigned &&
                      <FormattedNumber value={students.generalSigned} />
                    }
                  </td>
                  {
                    fourColumns &&
                    <td>
                      {
                        students.dentistrySigned &&
                        <FormattedNumber value={students.dentistrySigned} />
                      }
                    </td>
                  }
                  <td colSpan={fourColumns ? 1 : 2}>
                    {
                      students.generalAccepted &&
                      <span><FormattedNumber value={students.generalAccepted} /></span>
                    }
                    {
                      students.generalAccepted && students.generalSigned &&
                      <span className="percent-accepted"> ({Math.round(students.generalAccepted*100/students.generalSigned)} %)</span>
                    }
                  </td>
                  {
                    fourColumns &&
                    <td>
                      {
                        students.dentistryAccepted &&
                        <span><FormattedNumber value={students.dentistryAccepted} /></span>
                      }
                      {
                        students.dentistryAccepted && students.dentistrySigned &&
                        <span className="percent-accepted"> ({Math.round(students.dentistryAccepted*100/students.dentistrySigned)} %)</span>
                      }
                    </td>
                  }
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    }

    return (
      <>
        <Row>
          <Col className="mb-1">
            <div className="bg-circle-container">
              <div className="bg-circle bg-1" />
            </div>
            <h2 id={slugifyFaculty(field.faculty)}>
              {fixNbsp(field.faculty.title)}
            </h2>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={7}>
            <div className="text-justify">
              <Markdown value={field.description} />
            </div>
            {facultyStudents}
            <p className="updated-at">
              <FormattedMessage id="faculties_comparison.updated_at" defaultMessage="Lecturers" />
              &nbsp;
              <FormattedDate
                value={field.updatedAt}
                year="numeric"
                month="long"
                day="numeric"
              />
            </p>
          </Col>
          <Col md={5}>
            <Card className="description-panel">
              <ListGroup as="dl" className="list-group-flush">
                {descriptionPanelItems}
              </ListGroup>
            </Card>
            <div>
              <Button className="btn-find-course" as={AnchorLink} to="/#Course">
                <FormattedMessage id="faculties_comparison.courses" defaultMessage="Find a course" />
              </Button>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}
