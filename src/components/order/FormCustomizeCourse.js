import React from "react";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { fixNbsp } from '../../utils';
import { FormattedMessage } from 'react-intl';
import { Row, Col, Form } from 'react-bootstrap';
import { useOrder } from "./OrderContext";

function FormCustomizeCourse() {
  const {
    intl, formDisabled, isFullCourse, displayFaculties,
    faculty, setFaculty, biology, setBiology, chemistry, setChemistry, physics, setPhysics
  } = useOrder();
  const BA_UK = fixNbsp("Univerzita Komenského v\u00A0Bratislave");

  const facultiesCountry = {};
  displayFaculties.forEach(faculty => {
    facultiesCountry[fixNbsp(faculty.title)] = faculty.country;
  });

  return (
    <>
      <Row>
        <Form.Group as={Col} md={6} controlId="registerPreferredTime">
          <FormattedMessage id="register.preferred_time" defaultMessage="Preferred time">
            {(l_preferred_time) => (
              <>
                <Form.Label>
                  {l_preferred_time}
                </Form.Label>
                <Form.Control name="preferred_time" as="select" disabled={formDisabled}>
                  <option value=""></option>
                  <FormattedMessage id="register.preferred_time.morning" defaultMessage="Morning">
                    {(o) => <option value={o}>{o}</option>}
                  </FormattedMessage>
                  <FormattedMessage id="register.preferred_time.afternoon" defaultMessage="Afternoon">
                    {(o) => <option value={o}>{o}</option>}
                  </FormattedMessage>
                </Form.Control>
              </>
            )}
          </FormattedMessage>
        </Form.Group>
        <Form.Group as={Col} md={6} controlId="registerPreferredeDay">
          <FormattedMessage id="register.preferred_day" defaultMessage="Preferred day">
            {(l_preferred_day) => (
              <>
                <Form.Label>
                  {l_preferred_day}
                </Form.Label>
                <Form.Control name="preferred_day" as="select" disabled={formDisabled}>
                  <option value=""></option>
                  <FormattedMessage id="register.preferred_day.workday" defaultMessage="Workday">
                    {(o) => <option value={o}>{o}</option>}
                  </FormattedMessage>
                  <FormattedMessage id="register.preferred_day.weekend" defaultMessage="Weekend">
                    {(o) => <option value={o}>{o}</option>}
                  </FormattedMessage>
                </Form.Control>
              </>
            )}
          </FormattedMessage>
        </Form.Group>
      </Row>

      <Form.Group controlId="registerFaculty">
        <FormattedMessage id="register.faculty" defaultMessage="Faculty">
          {(l_faculty) => (
            <>
              <Row>
                <Col>
                <Form.Label>
                  {l_faculty}
                </Form.Label>
                </Col>
                <Col xs={"auto"}>
                  <AnchorLink to={`/faculties/#Quiz`}>
                    <FormattedMessage id="register.faculty.help" defaultMessage="Do you need help with selection?" />
                  </AnchorLink>
                </Col>
              </Row>
              <Form.Control
                name="faculty"
                as="select"
                onChange={event => {
                  setFaculty(event.target.value);
                  if(facultiesCountry[event.target.value] === "sk") {
                    setPhysics(false);
                  }
                }}
                disabled={formDisabled}
              >
                <option value=""></option>
                {displayFaculties.map((faculty, index) => {
                  return (
                    <option key={index} value={fixNbsp(faculty.title)}>
                      {fixNbsp(faculty.title)}
                    </option>
                  );
                })}
              </Form.Control>
            </>
          )}
        </FormattedMessage>
      </Form.Group>

      {
        isFullCourse && (
          <Form.Group controlId="registerCourses">
            <FormattedMessage id="register.courses" defaultMessage="Courses">
              {(l_courses) => (
                <>
                  <Form.Label>
                    {l_courses}
                  </Form.Label>
                  <Row>
                    <Col sm={4}>
                      <FormattedMessage id="register.course.biology" defaultMessage="Biology">
                        {(label) => (
                          <div className="switch-bg">
                            <Form.Check
                              label={label}
                              type="switch"
                              id="biology"
                              disabled={formDisabled}
                              checked={biology}
                              onChange={event => setBiology(event.target.checked)}
                            />
                          </div>
                        )}
                      </FormattedMessage>
                    </Col>
                    <Col sm={4}>
                      <FormattedMessage id="register.course.chemistry" defaultMessage="Chemistry">
                        {(label) => (
                          <div className="switch-bg">
                            <Form.Check
                              label={label}
                              type="switch"
                              id="chemistry"
                              disabled={formDisabled}
                              checked={chemistry}
                              onChange={event => setChemistry(event.target.checked)}
                            />
                          </div>
                        )}
                      </FormattedMessage>
                    </Col>
                    <Col sm={4}>
                      <FormattedMessage id={(
                          faculty.includes(BA_UK) ? "register.course.biophysics" : "register.course.physics"
                        )} defaultMessage="Physics">
                        {(label) => (
                          <div className="switch-bg">
                            <Form.Check
                              label={label}
                              type="switch"
                              id="physics"
                              disabled={ formDisabled || (
                                facultiesCountry[faculty] === "sk"
                                // && !state.faculty.includes(BA_UK)
                              ) }
                              checked={physics}
                              onChange={event => setPhysics(event.target.checked)}
                            />
                          </div>
                        )}
                      </FormattedMessage>
                    </Col>
                    <input type="hidden" name="courses" value={[
                      (biology ? intl.formatMessage({id: "register.course.biology"}) : ""),
                      (chemistry ? intl.formatMessage({id: "register.course.chemistry"}) : ""),
                      (physics ? intl.formatMessage({id: "register.course.physics"}) : ""),
                    ].filter(Boolean).join(", ")} />
                  </Row>
                </>
              )}
            </FormattedMessage>
          </Form.Group>
        )
      }
    </>
  );
}

export default FormCustomizeCourse;
