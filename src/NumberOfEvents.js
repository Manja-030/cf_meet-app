import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = { number: 10, errorText: '' };

  updateNumber = (event) => {
    const value = event.target.value;
    if (value < 1) {
      this.setState({
        number: '',
        errorText: 'Please enter 1 or bigger.',
      });
    } else {
      this.setState({
        number: value,
        errorText: '',
      });
      this.props.updateNumber(event.target.value);
    }
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
        <ErrorAlert text={this.state.errorText} />
      </div>
    );
  }
}

export default NumberOfEvents;
