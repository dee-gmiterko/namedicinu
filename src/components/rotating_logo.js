import React from "react";

import logo_base from "../images/logo_base.png"
import logo_center from "../images/logo_center.png"
import logo_part_1 from "../images/logo_part_1.png"
import logo_part_2 from "../images/logo_part_2.png"
import logo_part_3 from "../images/logo_part_3.png"

const RotatingLogo = ({ value }) => {
  return (
    <div class="rotating-logo">
      <div className="ccw">
        <div className="part-1">
          <img src={logo_part_1} className="cw" />
        </div>
        <div className="part-2">
          <img src={logo_part_2} className="cw" />
        </div>
        <div className="part-3">
          <img src={logo_part_3} className="cw" />
        </div>
        <img src={logo_base} className="part-base" />
      </div>
      <img src={logo_center} className="part-center" />
    </div>
  );
};

export default RotatingLogo;
