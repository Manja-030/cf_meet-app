import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(
      <NumberOfEvents updateEventNumbers={() => {}} />
    );
  });

  test('render number input', () => {
    expect(NumberOfEventsWrapper.find('.number')).toHaveLength(1);
  });

  test('render label for number input', () => {
    expect(NumberOfEventsWrapper.find('.number-label')).toHaveLength(1);
  });

  test('render default number', () => {
    expect(NumberOfEventsWrapper.state('number')).toBe(10);
  });

  /*test('change state when input changes', () => {
    NumberOfEventsWrapper.setState({ numberOfEvents: 32 });
    NumberOfEventsWrapper.find('.number').simulate('change', {
      target: { value: 10 },
    });
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(10);
  });*/
});
