import React, { Component } from 'react';
import { getEvents, extractLocations } from './api';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

class App extends Component {
  state = {
    events: [],
    locations: [],
    number: 10,
    location: 'all',
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, this.state.number),
          locations: extractLocations(events),
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount = this.state.number) => {
    getEvents().then((events) => {
      const locationEvents =
        location === 'all'
          ? events
          : events.filter((event) => event.location === location);
      const eventNumberFilter =
        eventCount > locationEvents.length
          ? locationEvents
          : locationEvents.slice(0, eventCount);
      if (this.mounted) {
        this.setState({
          events: eventNumberFilter,
        });
      }
    });
  };

  updateNumber = (number) => {
    this.setState(
      { number: number },
      this.updateEvents(this.state.location, number)
    );
  };

  render() {
    return (
      <div className="App">
        <div className="number-city-container">
          <NumberOfEvents
            number={this.state.number}
            updateNumber={this.updateNumber}
          />
          <CitySearch
            locations={this.state.locations}
            updateEvents={this.updateEvents}
          />
        </div>

        <EventList events={this.state.events} number={this.state.number} />
      </div>
    );
  }
}

export default App;
