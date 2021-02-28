import React, { Component } from "react";
import Img from "gatsby-image";

export default class FacultiesQuiz extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="work section" id="Work">
        <div className="container">
          <div className="section-head">
            <h2 className="text-center">Quiz</h2>
          </div>
          <form
            name="faculties-quiz"
            method="POST"
            data-netlify="true"
          >
            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked />
              <label class="form-check-label" for="flexRadioDefault1">
                Lala lala option numero uno
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
              <label class="form-check-label" for="flexRadioDefault2">
                Only lala lala
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" checked />
              <label class="form-check-label" for="flexRadioDefault3">
                Something totaly different
              </label>
            </div>
            <div>
              <button type="submit">Next</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
