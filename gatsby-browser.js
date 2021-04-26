/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";

export const onClientEntry = () => {
  if (window) {
    const ReactPixel =  require('react-facebook-pixel');
    ReactPixel.init('460630345218830', null, {
      autoConfig: true,
      debug: false,
    });
    if(!getCookieConsentValue()) {
      ReactPixel.revokeConsent();
    }
  }
}

export const onRouteUpdate = ({ location, prevLocation }) => {
  if (window) {
    const ReactPixel =  require('react-facebook-pixel');
    ReactPixel.pageView();
  }
}
