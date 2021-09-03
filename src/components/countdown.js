import React, { Component } from "react";
import moment from "moment";
import { FormattedRelativeTime } from 'react-intl';

export default class Countdown extends Component {

  constructor(props) {
    super(props);
    this.state = {
      now: moment()
    };
  }

  // componentDidMount() {
  //   this.timer = setInterval(this.tick.bind(this), 1000);
  // }
  //
  // componentWillUnmount() {
  //   clearInterval(this.timer);
  // }
  //
  // tick() {
  //   this.setState({
  //     now: moment()
  //   });
  // }

  render() {
    const { to, children } = this.props;
    const { now } = this.state;
    return (
      <FormattedRelativeTime value={to.diff(now, 'seconds')} updateIntervalInSeconds={1}>
        {(value) => (
          children(value)
        )}
      </FormattedRelativeTime>
    );
  }
}
