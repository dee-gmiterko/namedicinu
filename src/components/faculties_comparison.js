import React, { Component } from "react";
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Table } from 'react-bootstrap';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { slugify_faculty } from '../common';

import Markdown from "./markdown";

export default class FacultiesComparison extends Component {
  render() {
    const { faculties } = this.props;

    return (
      <Container className="faculties-comparison">
        {faculties.edges.map((item, index) => {

          let descriptionPanelCategories = {};
          item.node.descriptionPanel.forEach((item) => {
            if(!descriptionPanelCategories.hasOwnProperty(item.category)) {
              descriptionPanelCategories[item.category] = {
                titleValue: null,
                items: [],
              };
            }
            if(item.key) {
              descriptionPanelCategories[item.category].items.push({
                key: item.key,
                value: item.value,
              });
            } else {
              descriptionPanelCategories[item.category].titleValue = item.value;
            }
          });

          const simpleWebsiteRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/g;

          descriptionPanelCategories["Web"] = {
            titleValue: (
              <a href={item.node.website} target="_blank" rel="noopener noreferrer">
                <i class="fas fa-globe-africa"></i>&nbsp;
                {simpleWebsiteRegex.exec(item.node.website)[1]}
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
                    <strong>{categoryTitle}</strong>
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
          if(item.node.faculties_students) {
            facultyStudents = (
              <Table bordered size="sm" className="text-center students">
                <thead>
                  <tr>
                    <th>
                      {
                        !item.node.dentistry &&
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
                    item.node.dentistry &&
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
                        item.node.dentistry &&
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
                  {item.node.faculties_students.map((students, index) => {
                    const fourColumns = (students.dentistrySigned || students.dentistryAccepted)
                    return (
                      <tr key={index}>
                        <th>{students.year}</th>
                        <td colSpan={fourColumns ? 1 : 2}>{students.generalSigned}</td>
                        <td colSpan={fourColumns ? 1 : 2}>{students.generalAccepted}</td>
                        {
                          fourColumns &&
                          <>
                            <td>{students.dentistrySigned}</td>
                            <td>{students.dentistryAccepted}</td>
                          </>
                        }
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            );
          }

          return (
            <div key={index}>
              <Row>
                <Col md={12}>
                  <h2 id={slugify_faculty(item.node)}>{item.node.title}</h2>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col md={7}>
                  <div className="text-justify">
                    <Markdown value={item.node.description} />
                  </div>
                  {facultyStudents}
                  <p className="updated-at">
                    <FormattedMessage id="faculties_comparison.updated_at" defaultMessage="Lecturers" />
                    &nbsp;
                    <FormattedDate
                      value={item.node.updatedAt}
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
                </Col>
              </Row>
            </div>
          );
        })}
      </Container>
    );
  }
}
