# Scenario 1 Journey

Expect AI to create a new page in the apply for credit card wizard flow. The new page would ask certain users with good credit and good amount of assets, if they want to apply for a black card. Then they would have the option to apply for a regular or black credit card. This page would inject in after they submit for the card.

## First Try

Looking to provide the basics to the AI. Asked the AI to verify the consistency of the material, which it did. Then I refined the material based on suggestions. After getting comfortable with the responses, I let the AI work on solving the problem.

It first "fixed" the gaps it thought were missing and used the material to help fix them. Then I asked it to continue, which cause it to write the code and tests. Then ran quality checks, which failed, but it thought had completed successfully. So, reran the quality gate to verify. Then told AI about the failure, then it reran it.

After seeing the issues, it began trying to fix its code. It eventually stopped after it code get the unit tests to pass, but the e2e test were failing. Thus, breaking the ATDD process.

**Note**: during AI's implementation work, it would run e2e with the wrong env variable. The intent was to turn off the html reporter which hangs the playwright process if not turned off. So, told it what to do and added to `Claude.md`.

### Observations

- It did not work
- AI added the "new page" into the completion page. Did not expect this implementation, would have possibly accepted it if it worked.
- AI had to set the app up before implementing, unusual and not desired.
- AI was not using the correct env variable with Playwright to turn off showing the HTML report, which prevents playwright process from shutting down. Had to alter Claude.md to address this issue.
- Claude.md is ~60k and 40k is the recommended max size, so going to address this before moving on.
