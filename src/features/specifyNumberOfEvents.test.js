import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  let AppWrapper;
  test('When user hasn’t specified a number, 10 is the default number', ({
    given,
    when,
    then,
  }) => {
    given('the app is open', () => {
      AppWrapper = mount(<App />);
    });

    when(
      'the user has not entered a number in the number of events field',
      () => {}
    );

    then(
      'the user will see the default number 10 events (2 in local test)',
      () => {
        AppWrapper.update();
        expect(AppWrapper.find('.event')).toHaveLength(2);
      }
    );
  });

  test('User can change the number of events they want to see', ({
    given,
    when,
    then,
  }) => {
    given('there are that many upcoming events available', async () => {
      AppWrapper = mount(<App />);
    });

    when('the user enters a number in the number of events field', () => {
      AppWrapper.update();
      const eventObject = { target: { value: 1 } };
      AppWrapper.find('.number').simulate('change', eventObject);
    });

    then('the user will see a list of that number of events', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(1);
    });
  });
});
