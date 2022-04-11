import React, { Component } from 'react';
import Event from './Event';

class EventList extends Component {
  render() {
    const { events, number } = this.props;
    const eventNumberFilter = events.filter((index) => {
      return index < number;
    });

    return (
      <div>
        <p>Hello</p>
        <ul className="EventList">
          {eventNumberFilter.map((event) => {
            return (
              <li key={event.id}>
                <Event event={event} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default EventList;
