# Playwright Guidance

## Do Not Use toHaveURL

Do not use toHaveURL() to validate a page is correct in a step-definition. This only checks the URL, which is too simplistic. We want to make sure the page is loading correctly. Need to use a function on a page object, like "viewable" to validate one or more page elements are visible.

## Use Playwright's Default Timeout Behavior

Do not use waitForTimeout() or any other explicit timeout functions. Instead use Playwright's built-in timeout capabilities. Only use explicit timeout functions when other Playwright timeout capabilities do not work.
