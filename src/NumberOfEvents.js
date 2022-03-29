import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = { number: 10 };

  updateNumber = (event) => {
    this.setState({ number: event.target.value });
    this.props.updateNumber(event.target.value);
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <label className="number-label">Select Number of Events:</label>
        <input
          type="number"
          className="number"
          value={this.state.number}
          onChange={this.updateNumber}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
