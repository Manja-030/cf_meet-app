import React, { Component } from 'react';

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
        <h2 className="summary">{event.summary}</h2>
        <p className="start-time">
          {event.start.dateTime + event.start.timeZone}
        </p>
        <p className="event-location">{event.location}</p>
        <button className="details-btn" onClick={this.handleClick}>
          {collapsed ? 'show details' : 'hide details'}
        </button>
        {!collapsed && (
          <div className="details">
            <h3>About event:</h3>
            <p className="description">{event.description}</p>
          </div>
        )}
      </div>
    );
  }
}
export default Event;
