import React from "react";
import { FormattedMessage } from 'react-intl';
import { isCode } from '../../utils';
import { Row, Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useOrder } from "./OrderContext";

function FormContact() {
  const {
    formDisabled, codeDiscount, setCodeDiscount
  } = useOrder();

  return (
    <>
      <Row>
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
      </Row>

      <Row>
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
      </Row>

      <Row>
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
      </Row>

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

export default FormContact;
