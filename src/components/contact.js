import React, { Component } from "react";

export default class service extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="service section" id="Service">
        <div className="container">
          <div className="section-head">
            <h2>Contact</h2>
          </div>
          <div className="row">
            {data.contacts.map((item, index) => {
              return (
                <div key={index} className="col-md-4 mb-3">
                  <div className="service-main">
                    <a href={item.link}>
                      <i className={"fab fa-" + item.icon}></i>
                      <span>{item.contact}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
