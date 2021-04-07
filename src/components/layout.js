import React from "react";
import PropTypes from "prop-types";
import { IntlProvider } from 'react-intl';
import { FormspreeProvider } from '@formspree/react';

import Header from "./header";
import Footer from "./footer";

import messages_sk from "../locale/sk.json"
import messages_cs from "../locale/cs.json"

import "../css/style.scss";
import "../css/gibson.scss";
import "../css/font-awesome.scss";

// if (typeof window !== "undefined") {
//   require("smooth-scroll")('a[href*="#"]');
// }

const Layout = ({ site, header, locale, children }) => {

  var messages = messages_sk;
  if (locale === "cs") {
    messages = messages_cs;
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
      </FormspreeProvider>
    </IntlProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
