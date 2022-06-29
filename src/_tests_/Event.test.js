import React from 'react';
import { shallow } from 'enzyme';
import { mockData } from '../mock-data';
import Event from '../Event';

describe('<Event /> component', () => {
  let EventWrapper;
  beforeEach(() => {
    EventWrapper = shallow(<Event event={mockData[0]} />);
  });

  test('render event', () => {
    expect(EventWrapper.find('.event')).toHaveLength(1);
  });

  test('render h2 element for title', () => {
    expect(EventWrapper.find('h2')).toHaveLength(1);
  });

  test('render event summary in title', () => {
    const eventTitle = EventWrapper.find('h2');
    expect(eventTitle.text()).toBe(mockData[0].summary);
  });

  test('render p element for start time', () => {
    expect(EventWrapper.find('.start-time')).toHaveLength(1);
  });

  test('render start time of event', () => {
    const startTimeElement = EventWrapper.find('.start-time');
    expect(startTimeElement.text()).toBe(
      mockData[0].start.dateTime + mockData[0].start.timeZone
    );
  });

  test('render p element for event location', () => {
    expect(EventWrapper.find('.event-location')).toHaveLength(1);
  });

  test('render event location', () => {
    const locationElement = EventWrapper.find('.event-location');
    expect(locationElement.text()).toBe(mockData[0].location);
  });

  test('render details button', () => {
    const btnElement = EventWrapper.find('.details-btn');
    expect(btnElement.text()).toBe('show details');
  });

  test('toggle collapsed state on button click', () => {
    const btnElement = EventWrapper.find('.details-btn');
    btnElement.simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(false);
    btnElement.simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(true);
  });

  test('when collapsed is true, button label = show details', () => {
    EventWrapper.setState({ collapsed: true });
    const btnElement = EventWrapper.find('.details-btn');
    expect(btnElement.text()).toBe('show details');
  });

  test('when collapsed is false, button label = hide details', () => {
    EventWrapper.setState({ collapsed: false });
    const btnElement = EventWrapper.find('.details-btn');
    expect(btnElement.text()).toBe('hide details');
  });

  test('render details div when collapsed is false', () => {
    EventWrapper.setState({ collapsed: false });
    expect(EventWrapper.find('.details')).toHaveLength(1);
  });

  test('render no details div when collapsed is true', () => {
    EventWrapper.setState({ collapsed: true });
    expect(EventWrapper.find('.details')).toHaveLength(0);
  });

  test('render headline in details', () => {
    EventWrapper.setState({ collapsed: false });
    const detailElement = EventWrapper.find('.details');
    expect(detailElement.find('h3')).toHaveLength(1);
  });

  test('render p for event description in details', () => {
    EventWrapper.setState({ collapsed: false });
    const detailElement = EventWrapper.find('.details');
    expect(detailElement.find('.description')).toHaveLength(1);
  });

  test('render event description in details', () => {
    EventWrapper.setState({ collapsed: false });
    const detailElement = EventWrapper.find('.details');
    expect(detailElement.find('.description').text()).toBe(
      mockData[0].description
    );
  });
});
