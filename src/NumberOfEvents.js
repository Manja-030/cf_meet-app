import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  render() {
    return (
      <div className="NumberOfEvents">
        <label className="number-label">Select Number of Events:</label>
        <input
          type="number"
          className="number"
          value={this.props.number}
          onChange={this.props.updateNumber}
        />
        <ErrorAlert text={this.props.errorText} />
      </div>
    );
  }
}

export default NumberOfEvents;
