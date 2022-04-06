import React, { Component } from 'react';
import Event from './Event';

class EventList extends Component {
  render() {
    const { events, number } = this.props;
    const eventNumberFilter = events.filter((index) => {
      if (events.length > 48) {
        return index < 48;
      } else {
        return index < number;
      }
    });

    return (
      <ul className="EventList">
        {eventNumberFilter.map((event) => (
          <li key={event.id}>
            <Event event={event} />
          </li>
        ))}
      </ul>
    );
  }
}

export default EventList;
