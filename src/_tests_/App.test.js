import React from 'react';
import { shallow, mount } from 'enzyme';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';

describe('<App /> component', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test('render EventList', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('render NumberOfEvents', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

describe('<App /> integration', () => {
  test('App passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(
      AppLocationsState
    );
    AppWrapper.unmount();
  });

  test('get list of events matching the city selected by the user', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * suggestions.length);
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(
      (event) => event.location === selectedCity
    );
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test('get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    await suggestionItems.at(suggestionItems.length - 1).simulate('click');
    const allEvents = await getEvents();
    expect(AppWrapper.state('events')).toEqual(allEvents);
    AppWrapper.unmount();
  });

  test('App passes "number" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppNumberState = AppWrapper.state('number');
    expect(AppNumberState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().number).toEqual(AppNumberState);
    AppWrapper.unmount();
  });

  test('App passes "number" state as a prop to NumberOfEvents', () => {
    const AppWrapper = mount(<App />);
    const AppNumberState = AppWrapper.state('number');
    expect(AppNumberState).not.toEqual(undefined);
    expect(AppWrapper.find(NumberOfEvents).props().number).toEqual(
      AppNumberState
    );
    AppWrapper.unmount();
  });

  /*test('render the default number of events', async () => {
    const AppWrapper = await mount(<App />);
    AppWrapper.setState({ events: mockData });
    const AppNumberState = AppWrapper.state('number');
    expect(AppWrapper.find('.EventList li')).toHaveLength(AppNumberState);
    AppWrapper.unmount();
  });*/

  test('update number input field after user input', async () => {
    const AppWrapper = await mount(<App />);
    const numberField = AppWrapper.find('.number');
    const eventObject = { target: { value: 3 } };
    numberField.simulate('change', eventObject);
    expect(AppWrapper.state('number')).toBe(eventObject.target.value);
    AppWrapper.unmount();
  });

  test('render number of events depending on user input', async () => {
    const AppWrapper = await mount(<App />);
    AppWrapper.setState({ events: mockData });
    const eventObject = { target: { value: 1 } };
    AppWrapper.find('.number').simulate('change', eventObject);
    expect(AppWrapper.find('.EventList li')).toHaveLength(
      AppWrapper.state('number')
    );
    AppWrapper.unmount();
  });
});
