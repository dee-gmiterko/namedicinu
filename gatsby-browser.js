/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

import { pixelInit, pixelTrackPage } from './src/fb-pixel';

export const onClientEntry = () => {
  try {
    pixelInit();
  } catch (e) {
    console.log(e);
  }
}

export const onRouteUpdate = ({ location, prevLocation }) => {
  try {
    pixelTrackPage();
  } catch (e) {
    console.log(e);
  }
}
