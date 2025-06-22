# Sample project for Declarative Gherkin via Cucumber

This is a training aide to help people learn Declarative Gherkin.  It is not
easy to learn Declarative Gherkin.  Thus, this app helps people understand how
to take what they learned in training and see a working implementation.

Start with our [declarative gherkin docs](./docs/declarative-gherkin.md) to learn more about Declarative Gherkin and key concepts around Centralized Data Management, Cucumber Logging as well as app-specific terms used in the app like Back-end Ratio and Credit Score.

The [/features](./features) folder contains Declarative Gherkin feature files (Given, When, Then style tests).

See [Cucumber Logging](./docs/cucumber-logging.md) to troubleshoot e2e tests.

## How to run the full declarative Gherkin demo (app and end to end tests)

```bash
npm run setup

# run the end to end tests
npm run e2e:demo
```

The run should fail due to one failing test, but otherwise all tests should execute.

The Playwright HTML test report will display in your default browser. If not, open the file `./playwright-report/index.html` in a browser to see the report.

## Run the Example App

This demo uses a single app with everything running in memory.  No servers are
used for this demo.

```bash
# start the app
npm run dev
```

Open browser to  `http://localhost:4200`

## Local Development

Read [CLAUDE.md](./CLAUDE.md) for details.
