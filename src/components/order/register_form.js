import React from "react";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { Row, Col, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useIntl, FormattedMessage } from 'react-intl';

import { fixNbsp, isCode } from '../../common';
import { useOrder } from "./order_context";

function RegisterForm() {
  const {
    intl, formState, productTitle, formDisabled, isFullCourse, onChangeNumCourses, codeDiscount, setCodeDiscount, displayFaculties, price, locale,
    faculty, setFaculty, biology, setBiology, chemistry, setChemistry, physics, setPhysics, consent, setConsent
  } = useOrder();
  const BA_UK = fixNbsp("Univerzita Komenského v\u00A0Bratislave");

  const facultiesCountry = {};
  displayFaculties.forEach(faculty => {
    facultiesCountry[fixNbsp(faculty.title)] = faculty.country;
  });

  const submitDisabled = formDisabled || !consent || formState.submitting
    || (isFullCourse && !(biology || chemistry || physics));

  return (
    <>
      <Form.Row>
        <Form.Group as={Col} md={6} controlId="registerEmail">
          <FormattedMessage id="register.email" defaultMessage="Email">
            {(l_email) => (
              <>
                <Form.Label>
                  {l_email} *
                </Form.Label>
                <Form.Control require="true" name="email" type="email" disabled={formDisabled} />
              </>
            )}
          </FormattedMessage>
        </Form.Group>
        <Form.Group as={Col} md={6} controlId="registerName">
          <FormattedMessage id="register.name" defaultMessage="Name">
            {(l_name) => (
              <>
                <Form.Label>
                  {l_name} *
                </Form.Label>
                <Form.Control require="true" name="name" type="input" disabled={formDisabled} />
              </>
            )}
          </FormattedMessage>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} xs={12} controlId="registerAddressStreet">
          <FormattedMessage id="register.address_street" defaultMessage="Address">
            {(l_address_street) => (
              <>
                <Form.Label>
                  {l_address_street} *
                </Form.Label>
                <Form.Control require="true" name="address_street" type="input" disabled={formDisabled} />
              </>
            )}
          </FormattedMessage>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} md={4} controlId="registerAddressTown">
          <FormattedMessage id="register.address_town" defaultMessage="Town">
            {(l_address_town) => (
              <>
                <Form.Label>
                  {l_address_town} *
                </Form.Label>
                <Form.Control require="true" name="address_town" type="input" disabled={formDisabled} />
              </>
            )}
          </FormattedMessage>
        </Form.Group>
        <Form.Group as={Col} md={3} controlId="registerAddressZip">
          <FormattedMessage id="register.address_zip" defaultMessage="Zip code">
            {(l_address_zip) => (
              <>
                <Form.Label>
                  {l_address_zip} *
                </Form.Label>
                <Form.Control require="true" name="address_zip" type="input" disabled={formDisabled} />
              </>
            )}
          </FormattedMessage>
        </Form.Group>
        <Form.Group as={Col} md={5} controlId="registerAddressCountry">
          <FormattedMessage id="register.address_country" defaultMessage="Country">
            {(l_address_country) => (
              <>
                <Form.Label>
                  {l_address_country} *
                </Form.Label>
                <Form.Control require="true" name="address_country" type="input" disabled={formDisabled} />
              </>
            )}
          </FormattedMessage>
        </Form.Group>
      </Form.Row>

      <Form.Row>
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
      </Form.Row>

      <Form.Group controlId="registerFaculty">
        <FormattedMessage id="register.faculty" defaultMessage="Faculty">
          {(l_faculty) => (
            <>
              <Form.Label>
                {l_faculty}
              </Form.Label>
              <AnchorLink to={`/faculties/#Quiz`} className="float-right">
                <FormattedMessage id="register.faculty.help" defaultMessage="Do you need help with selection?" />
              </AnchorLink>
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

      <Form.Group controlId="registerReference" className="position-relative">
        <FormattedMessage id="register.reference" defaultMessage="Reference">
          {(l_reference) => (
            <>
              <Form.Label>
                {l_reference}&nbsp;
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="tooltip-reference">
                      <FormattedMessage id="register.reference.help" defaultMessage="E.g., Facebook" />
                    </Tooltip>
                  }
                >
                  <i className="fa fa-question-circle help" />
                </OverlayTrigger>
              </Form.Label>
              <Form.Control onChange={(e) => setCodeDiscount(isCode(e.target.value))} name="reference" type="input" disabled={formDisabled} />
              {
                codeDiscount &&
                <div className="code-discount"><em>-10%</em></div>
              }
            </>
          )}
        </FormattedMessage>
      </Form.Group>
    </>
  );
}

export default RegisterForm;
