import React, { Component } from 'react';
import moment from 'moment';
import { BsAlarm } from 'react-icons/bs';
import { GoLocation } from 'react-icons/go';

class Event extends Component {
  state = { collapsed: true };

  handleClick = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    const { event } = this.props;
    const { collapsed } = this.state;
    return (
      <div className="event">
        <div className="summary-wrapper">
          <h2 className="summary event-text">{event.summary}</h2>
        </div>
        <p className="start-time event-text">
          <BsAlarm id="time-icon" />{' '}
          {moment(event.start.dateTime).format('MMMM Do YYYY, h:mm a')}
        </p>
        <p className="event-location event-text">
          <GoLocation id="location-icon" /> {event.location}
        </p>
        <button className="details-btn" onClick={this.handleClick}>
          {collapsed ? 'show details' : 'hide details'}
        </button>
        {!collapsed && (
          <div className="details event-text">
            <h3 className="event-text">About event:</h3>
            <a
              className="calendar-link"
              href={event.htmlLink}
              target="_blank"
              rel="noreferrer"
            >
              See details on Google Calendar
            </a>
            <p className="description event-text">{event.description}</p>
          </div>
        )}
      </div>
    );
  }
}
export default Event;
