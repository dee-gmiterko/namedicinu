import React from "react";
import PropTypes from "prop-types";
import { IntlProvider, FormattedMessage } from 'react-intl';
import { FormspreeProvider } from '@formspree/react';
import CookieConsent from "react-cookie-consent";

import Header from "./header";
import Footer from "./footer";

import messages_sk from "../locale/sk.json"
import messages_cs from "../locale/cs.json"

import "../css/style.scss";
import "../css/gibson.scss";
import "../css/font-awesome.scss";

const Layout = ({ site, header, locale, children }) => {

  var messages = messages_sk;
  if (locale === "cs") {
    messages = messages_cs;
  }

  const grantConsent = () => {
    const ReactPixel =  require('react-facebook-pixel');
    ReactPixel.grantConsent();
  }

  return (
    <IntlProvider locale={locale} messages={messages}>
      <FormspreeProvider project="1651131023250947820">
        <Header
          site={site}
          header={header}
        />
        <div>
          <main>{children}</main>
        </div>
        <Footer site={site} />
        <FormattedMessage id="gdpr.button" defaultMessage="Accept">
          {(gdpr_button) => (
            <CookieConsent
              location="bottom"
              buttonText={gdpr_button}
              disableStyles={true}
              buttonClasses="btn btn-primary btn-sm"
              onAccept={grantConsent}
            >
              <FormattedMessage id="gdpr.message" defaultMessage="This website uses cookies to enhance the user experience." />
              {/* TODO
                <> </>
                <FormattedMessage id="gdpr.more" defaultMessage="More information." />
              */}
            </CookieConsent>
          )}
        </FormattedMessage>
      </FormspreeProvider>
    </IntlProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
