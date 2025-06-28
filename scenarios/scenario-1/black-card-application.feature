
  Scenario: Successfully apply for a black card with bear minimums
    Given "Richie Rich" logs in
    And "Richie Rich" fills out the form with their information
    When they submit their form
    Then they see a "black card success" submittal response

  Scenario: Successfully apply for a regular card with bear minimums
    Given "Richie Rich" logs in
    And "Richie Rich" fills out the form with their information
    When they submit their form
    Then they see a "success" submittal response

  Scenario: Successfully apply for regular card while right under black card dollar minimum
    Given "Tom Smith" logs in with these mods
      | name                                       |
      | Assets $1 under black card dollar minimum  |
    And "Tom Smith" fills out the form with their information
    When they submit their form
    Then they see a "success" submittal response

  Scenario: Successfully apply for regular card while right under black card credit score minimum
    Given "Tom Smith" logs in with these mods
      | name                                    |
      | Right under the black card credit score |
    And "Tom Smith" credit score is set correctly
    And "Tom Smith" fills out the form with their information
    When they submit their form
    Then they see a "success" submittal response
