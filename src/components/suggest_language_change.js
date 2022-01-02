import React, { useState, useEffect } from "react";
import { Modal, Row, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import preferredLocale from 'preferred-locale';

const SuggestLanguageChange = ({ locale }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    localStorage.setItem('locale-is-ok', true);
    setShow(null);
  };

  useEffect(() => {
    let expected = locale === "sk" ? 'sk-sk' : 'cs-cz';
    let preferred = preferredLocale(['sk-sk', 'cs-cz'], expected, { lowerCaseRegion: true });
    if (preferred !== expected) {
      let itsOk = localStorage.getItem('locale-is-ok');
      if(!itsOk) {
        setShow(true);
      }
    }
  }, [locale]);

  const otherWebsite = locale === "sk" ? `https://namedicinu.cz/` : `https://namedicinu.sk/`;

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="language-modal">
      <Modal.Header className="pl-5 pt-5 pr-5" closeButton>
        <Modal.Title>
          <FormattedMessage id="title.language_change" defaultMessage="Change language" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="pl-5 pr-5">
          <FormattedMessage id="language_change.description" defaultMessage="" />
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Row className="pr-4 pb-3">
          <Button variant="primary" href={otherWebsite}>
            <FormattedMessage id="language_change.yes" defaultMessage="Change language" />
          </Button>
          <Button variant="primary" onClick={handleClose} className="ml-3">
            <FormattedMessage id="language_change.no" defaultMessage="No, thanks" />
          </Button>
        </Row>
      </Modal.Footer>
    </Modal>
  );
}

export default SuggestLanguageChange;
