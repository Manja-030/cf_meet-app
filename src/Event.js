import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';

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
        <h2 className="summary event-text">{event.summary}</h2>
        <p className="start-time event-text">
          {event.start.dateTime + event.start.timeZone}
        </p>
        <p className="event-location event-text">{event.location}</p>
        <button className="details-btn" onClick={this.handleClick}>
          {collapsed ? 'show details' : 'hide details'}
        </button>
        {!collapsed && (
          <div className="details event-text">
            <h3 className="event-text">About event:</h3>
            <p className="description event-text">{event.description}</p>
          </div>
        )}
      </div>
    );
  }
}
export default Event;
