import { getCookieConsentValue } from "react-cookie-consent";

let ReactPixel;
if (typeof window === "undefined") {
  ReactPixel = null;
} else {
  ReactPixel = require('react-facebook-pixel').default;
}

export const pixelInit = () => {
  if (ReactPixel) {
    // ReactPixel.init('460630345218830', null, {
    //   autoConfig: true,
    //   debug: false,
    // });
    if(!getCookieConsentValue()) {
      ReactPixel.revokeConsent();
    }
  }
}

export const pixelTrackRegister = () => {
  if (ReactPixel) {
    ReactPixel.track("CompleteRegistration", {
      content_name: "Course",
    });
  }
}

export const pixelTrackPage = () => {
  if (ReactPixel) {
    ReactPixel.pageView();
  }
}

export const pixelTrackPlayLecuture = () => {
  ReactPixel.trackCustom("PlayLecuture");
}

export const pixelTrackQuiz = (question, answer) => {
  ReactPixel.trackCustom("Quiz", {question, answer});
}

export const pixelTrackContact = () => {
  ReactPixel.trackCustom("Contact");
}

export const pixelGrantConsent = () => {
  if (ReactPixel) {
    ReactPixel.grantConsent();
  }
}
