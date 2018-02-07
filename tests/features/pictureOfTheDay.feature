Feature: Picture of the day
  As a fan of Nasa
  I want to be able to see Nasa's picture of the day
  To learn about newly discovered astronomical bodies

  @focus
  Scenario: Opening the App
    When I open the app
    Then I see the app loaded

  Scenario: Displaying a picture
    Given It is "2018-01-02"
    When I open the app
    Then I see the picture titled "Unexpected X-Rays from Perseus Galaxy Cluster"