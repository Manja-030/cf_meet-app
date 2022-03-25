import React, { Component } from 'react';
import Event from './Event';

class EventList extends Component {
  render() {
    const adjustedEventList = this.props.events.splice(0, this.props.number);

    return (
      <ul className="EventList">
        {adjustedEventList.map((event) => (
          <li key={event.id}>
            <Event event={event} />
          </li>
        ))}
      </ul>
    );
  }
}

export default EventList;
