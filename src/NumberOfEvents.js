import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 10,
  };

  handleChangeInput = (event) => {
    this.setState({
      numberOfEvents: event.target.value,
    });
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <label className="number-label">
          Number of Events:
          <input
            type="number"
            className="number"
            value={this.state.numberOfEvents}
            onChange={this.handleChangeInput}
          />
        </label>
      </div>
    );
  }
}

export default NumberOfEvents;
