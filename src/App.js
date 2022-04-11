import React, { Component } from 'react';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import './App.css';
import './nprogress.css';
import meet_logo2 from './assets/meet_logo2.jpg';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { InfoAlert } from './Alert';
import EventGenre from './EventGenre';
import WelcomeScreen from './WelcomeScreen';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

class App extends Component {
  state = {
    events: [],
    locations: [],
    number: 12,
    location: 'all',
    showWelcomeScreen: undefined,
    errorText: '',
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events: events,
            locations: extractLocations(events),
          });
        }
      });
    }
  }

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const chartNumber = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(', ').shift();
      return { city, chartNumber };
    });
    console.log(data);
    return data;
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents =
        location === 'all'
          ? events
          : events.filter((event) => event.location === location);

      if (this.mounted) {
        this.setState({
          events: locationEvents,
        });
      }
    });
  };

  updateNumber = (number) => {
    let numberWarning = '';
    if (number < 0) {
      numberWarning = 'Number can not be negative.';
    } else if (number > this.state.events.length) {
      numberWarning = `There are only $(this.state.events.length) events.`;
    } else {
      this.setState({ number: number });
    }
    this.setState({ errorText: numberWarning });
  };

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className="App" />;
    return (
      <div className="App">
        <div className="header">
          <img
            src={meet_logo2}
            className="meet-logo responsive"
            alt="meet-logo"
          ></img>
        </div>
        <div className="welcome-message">
          <p>Welcome to my meet app!</p>
          <p>Find web development events near you and meet other students.</p>
        </div>
        <div className="offline-warning">
          {!navigator.onLine ? (
            <InfoAlert text="You are offline, the event list might not be up to date." />
          ) : (
            ''
          )}
        </div>
        <div className="number-city-container">
          <NumberOfEvents
            number={this.state.number}
            updateNumber={this.updateNumber}
            errorText={this.state.errorText}
          />
          <CitySearch
            locations={this.state.locations}
            updateEvents={this.updateEvents}
          />
        </div>
        <div className="data-vis-wrapper">
          <h4>Events in each city</h4>
          <EventGenre events={this.state.events} />
          <ResponsiveContainer height={300}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis
                type="number"
                dataKey="chartNumber"
                name="number of events"
                allowDecimals={false}
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#3B6978" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList events={this.state.events} number={this.state.number} />
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    );
  }
}

export default App;
