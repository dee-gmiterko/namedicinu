import React from "react";
import { FormspreeProvider } from "@formspree/react";
import { IntlProvider, FormattedMessage } from "react-intl";
import { pixelGrantConsent } from "../fb-pixel";
import CookieConsent from "react-cookie-consent";
import Footer from "./Footer";
import Header from "./Header";
import PropTypes from "prop-types";
import SuggestLanguageChange from "./SuggestLanguageChange";

import messages_sk from "../locale/sk.json";
import messages_cs from "../locale/cs.json";

import "../css/style.scss";
import "../css/gibson.scss";
import "../css/font-awesome.scss";

const Layout = ({ site, header, locale, children }) => {
  var messages = messages_sk;
  if (locale === "cs") {
    messages = messages_cs;
  }

  return (
    <IntlProvider locale={locale} messages={messages}>
      <FormspreeProvider project="1651131023250947820">
        <Header site={site} header={header} />
        <div>
          <SuggestLanguageChange locale={locale} />
          <main>{children}</main>
        </div>
        <Footer site={site} />
        <FormattedMessage id="gdpr.button" defaultMessage="Accept">
          {(gdpr_button) => (
            <FormattedMessage id="gdpr.button_decline" defaultMessage="Decline">
              {(gdpr_button_decline) => (
                <CookieConsent
                  location="bottom"
                  buttonText={gdpr_button}
                  declineButtonText={gdpr_button_decline}
                  disableStyles={true}
                  buttonWrapperClasses="cookie-buttons"
                  buttonClasses="btn btn-primary btn-sm"
                  declineButtonClasses="btn btn-primary btn-sm btn-decline"
                  enableDeclineButton
                  onAccept={pixelGrantConsent}
                >
                  <FormattedMessage
                    id="gdpr.message"
                    defaultMessage="This website uses cookies to enhance the user experience."
                  />
                </CookieConsent>
              )}
            </FormattedMessage>
          )}
        </FormattedMessage>
      </FormspreeProvider>
    </IntlProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
