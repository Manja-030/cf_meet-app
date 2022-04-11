import React, { Component } from 'react';
import Event from './Event';

class EventList extends Component {
  render() {
    const { events } = this.props;
    const numberFilter = events.filter((item, index) => {
      return index < this.props.number;
    });
    return (
      <div>
        <p>Hello</p>
        <ul className="EventList">
          {numberFilter.map((event) => {
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
