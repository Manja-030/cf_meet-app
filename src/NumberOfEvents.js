import React, { Component } from 'react';

class NumberOfEvents extends Component {
  render() {
    return (
      <div className="NumberOfEvents">
        <label className="number-label">
          Number of Events:
          <input
            type="number"
            className="number"
            defaultValue={this.props.number}
            onChange={(e) => this.props.updateNumber(e.target.value)}
          />
        </label>
      </div>
    );
  }
}

export default NumberOfEvents;
