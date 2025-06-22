# Cucumber Logging

Tools like BrowserStack, Sauce Labs and others have these great tools, like
recording and logging.  However, they are horrible to sync up with your
Cucumber Scenarios, which makes troubleshooting with these services painful.
To shorten your troubleshooting time, set up your Cucumber Logging.

Cucumber has the attach capability, which can append almost anything to the
output JSON file.  This file can be converted into a HTML report.  The report
shows the status of each scenario steps, the before and after hooks.  Attach
place text or images relative to the context it was executed within.  This means
a test error stack trace can be shown within the failing scenario step.  In
addition, embedding a web-client screenshot of the failing scenario step
alongside the stack trace is very powerful.  Even more can be logged.

Besides logging the stack trace from the test code and the screenshot of the
failing web-client, browser logs can be embedded into the HTML report.  
In our implementation, they are obtained at the end of scenario.  In addition,
we only obtain error messages to keep the noise down.

## Viewing the BDD HTML Report

After running the e2e test suite, it generates a HTML report.  
The e2e test suite creates a Cucumber HTML report in
`<root-folder>/playwright-report`.  Opening `index.html` in a browser will
allow you see the failing and passing items.

<!-- TODO need to add a failing test to describe here. -->

## Logging Stack Trace and Screenshots

See Playwright trace and it viewer for details. Also, look at the HTML report for Playwright-BDD.
