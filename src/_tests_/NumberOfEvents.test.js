import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  NumberOfEventsWrapper = shallow(<NumberOfEvents />);

  test('render number input', () => {
    expect(NumberOfEventsWrapper.find('.number')).toHaveLength(1);
  });

  test('render label for number input', () => {
    expect(NumberOfEventsWrapper.find('.number-label')).toHaveLength(1);
  });

  test('render default number 32', () => {
    const number = NumberOfEventsWrapper.props.numberOfEvents;
    expect(NumberOfEventsWrapper.find('number').value).toBe(number);
  });

  test('change state when input changes', () => {
    NumberOfEventsWrapper.setState({ numberOfEvents: 32 });
    NumberOfEventsWrapper.find('.number').simulate('change', {
      target: { value: 10 },
    });
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(10);
  });
});
