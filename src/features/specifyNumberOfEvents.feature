Feature: specify number of events

  Scenario: When user hasn’t specified a number, 10 is the default number
    Given the app is open
    When the user has not entered a number in the number of events field
    Then the user will see the default number 10 events (2 in local test)

  Scenario: User can change the number of events they want to see
    Given there are that many upcoming events available
    When the user enters a number in the number of events field
    Then the user will see a list of that number of events
