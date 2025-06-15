# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Declarative Gherkin training project built with React, TypeScript, and Cucumber. It demonstrates how to write concise, business-readable test scenarios using the Declarative Gherkin methodology. The project uses a fictional "First Bank of Change" credit application as the demo application.

## Commands

All commands should be run from the **root directory** (not from subdirectories):

### Development

- `npm run dev` - Start the React app with Vite (accessible at <http://localhost:5173>)
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build
- `npm run test` - Run all unit tests with Jest
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run linting checks with ESLint
- `npm run lint:fix` - Fix auto-fixable linting issues
- `npm run type-check` - Run TypeScript type checking

### E2E Testing

All `npm run e2e` commands automatically start the app for testing, so no need to run `npm run dev` before running the tests.

- `docker compose up selenium` - Start Selenium container with VNC (view at <http://localhost:7900/?autoconnect=1&resize=scale&password=secret>)
- `npm run e2e` - Run full E2E test suite (requires selenium container)
- `npm run e2e:headless` - Run E2E tests in headless mode
- `npm run snippets` - Generate Cucumber step definition snippets

### Dependencies

- `npm install` - Install Node.js dependencies

## Architecture

### Core Structure

- **Modern React App**: Simplified single-page application built with Vite
- **Source Structure**: All application code in `src/` directory
- **Component Organization**: Feature-based component structure
- **Modern Build System**: Vite for fast development and optimized production builds

### Directory Structure

```
src/
├── components/          # Feature-organized React components
│   ├── auth/           # Authentication components (login, private routes)
│   ├── forms/          # Credit application form components
│   ├── navigation/     # Header, navigation components
│   └── shared/         # Shared/reusable components
├── services/           # Business logic and data services
├── pages/             # Page-level components
├── assets/            # Static assets
├── styles/            # Global styles
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

### Test Architecture

- **Feature Files**: Located in `features/*.feature` using Declarative Gherkin syntax
- **Step Definitions**: Located in `features/step-definitions/`
- **Page Objects**: Located in `features/pageobjects/` following WebdriverIO patterns
- **Data Management**: Centralized test data in `features/data/data.json`
- **Unit Tests**: Jest tests co-located with components (`*.spec.tsx`)

### Build System

- **Vite**: Modern build tool for fast development and optimized production builds
- **TypeScript**: Full type checking and compilation
- **SCSS**: Styling with Sass support
- **SVG Components**: SVG files imported as React components via vite-plugin-svgr
- **Path Aliases**: Clean imports using `@components`, `@services`, etc.

### Key Concepts

- **Declarative Gherkin**: Business-readable test scenarios without technical implementation details
- **Centralized Data Management**: Test data organized by personas with meaningful aliases
- **Docker Integration**: Uses Docker Compose for consistent E2E testing environments
- **Functional Programming**: Arrow functions and functional patterns throughout

### Test Data Pattern

Test scenarios use personas with descriptive aliases like:

- "Tom Smith w/ minimum acceptable back-end ratio"
- "Lisa Mach w/ highest failing credit score"

This allows tests to be self-documenting and business-readable while referencing specific test data configurations.

## 🚨 MANDATORY WORKFLOW - NO EXCEPTIONS 🚨

**CRITICAL**: After EVERY single code change, you MUST run both test and quality scripts. This is NON-NEGOTIABLE.

### Required Commands After Every Change

All commands should be run from the **root directory**:

```bash
# 1. ALWAYS run tests first - NO EXCEPTIONS
npm run test

# 2. ALWAYS run quality checks - NO EXCEPTIONS
npm run lint

# 3. ALWAYS run E2E tests - NO EXCEPTIONS
npm run e2e:headless
```

### Workflow Enforcement Rules

1. **NEVER proceed to the next task** until both `npm run test` and `npm run lint` pass from the root directory
2. **NEVER skip this workflow** - even for "small changes" or "quick fixes"
3. **ALWAYS run the full test suite** - no selective testing
4. **ALWAYS verify quality standards** - no exceptions for any file type

### Quality Gates - ALL Must Pass

- ✅ **All tests pass**: `npm run test` returns success
- ✅ **No linting errors**: ESLint finds no issues
- ✅ **Build succeeds**: `npm run build` completes successfully
- ✅ **Type checking passes**: `npm run type-check` finds no errors
- ✅ **Functional patterns**: Code follows functional programming constraints

### Failure Response Protocol

If ANY quality gate fails:

1. **STOP** all other work immediately
2. **FIX** the failing quality check first
3. **RE-RUN** both test and quality scripts
4. **ONLY THEN** proceed with next task

## Development Approach

**IMPORTANT**: This project uses Acceptance Test Driven Development (ATDD) with Cucumber/WebdriverIO. Before implementing any feature:

1. **Read the feature specifications** in `features/*.feature`
2. **Write Cucumber acceptance tests** that describe the expected behavior in BDD style
3. **Implement features to satisfy the acceptance tests**
4. **Validate each test passes** before moving to the next
5. **Reference the feature file continuously** during development to ensure requirements are met

The feature file contains comprehensive Gherkin scenarios that define the expected behavior. Translate these into Cucumber/WebdriverIO as executable specifications.

**All development must satisfy the acceptance criteria defined in the feature files.**

## Technical Constraints

### Code Style Requirements

- **MANDATORY**: Use vanilla TypeScript
- **MANDATORY**: Implement functional programming patterns throughout
- **MANDATORY**: Use arrow functions exclusively for function definitions
- **MANDATORY**: Avoid classes - use factory functions and closures instead (page objects are acceptable for testing)
- **MANDATORY**: Markdown formatting rules: use Markdown for documentation, no HTML tags
- **MANDATORY**: Markdown needs to be markdownlint compliant with the default rules
- **NO SEMICOLONS** (enforced by Prettier configuration)
- Single quotes for strings
- 2-space indentation
- 80-character line limit
- Trailing commas in ES5 contexts
- No unused variables
- Prefer const over let
- No var declarations
- Consistent arrow function spacing
- No duplicate imports

### Technology Stack

- **React 19**: Latest React with modern patterns
- **TypeScript 5**: Full type safety
- **Material-UI v6**: UI component library with Emotion styling
- **React Router v7**: Client-side routing
- **Vite**: Build tool and development server
- **Jest**: Unit testing framework
- **WebdriverIO**: E2E testing framework
- **Cucumber**: BDD testing with Gherkin syntax

## Implementation Process - ATDD Workflow

Follow this Acceptance Test Driven Development workflow:

### 1. Scenario Analysis

For each feature in `features/*.feature`:

- Read and understand the Gherkin scenario
- Identify the Given/When/Then acceptance criteria
- Note any data tables or example values
- Understand the expected behavior completely
- Data used in the scenario are noted in `features/data/data.json`
  - Use name or aliases in the data file to associate with steps in the scenarios

### 2. Implementation to Satisfy Existing Tests

- **Review existing Cucumber step definitions** in `features/step-definitions/*.steps.ts`
- **Run the E2E tests** to see which scenarios are currently failing
- **Implement application features** to make the failing tests pass. Implement just enough application code to make the test pass
- **After test passes, run quality checks**: `npm run lint` in the root directory
- **Focus on the React components and business logic** that the tests are exercising
- Refactor while keeping tests green and code quality high

### 3. Validation

- Ensure each Cucumber test passes completely before moving on
- **Verify code passes ESLint and TypeScript checks**
- Verify edge cases mentioned in the feature scenarios
- Confirm the implementation matches the expected behavior exactly

## Success Criteria

The application should satisfy ALL scenarios in `features/*.feature`:

**Each scenario must pass its acceptance criteria before the feature is considered complete.**

## Acceptance Test Setup

### Prerequisites for E2E Testing

- Run `npm install` first to install dependencies
- Start Selenium container: `docker compose up selenium`
- Then run E2E tests to see failing scenarios

### Step File Structure Example

```javascript
// features/step-definitions/common.steps.ts
import { Given, When, Then } from '@cucumber/cucumber';
import dataManager from '../data/data-manager';
import homePage from '../pageobjects/home.page';
import loginPage from '../pageobjects/login.page';

Given(/^"(.*)" logs in$/, (userNameAlias) => {
    const userData = dataManager.getData(userNameAlias, true);
    homePage.open();
    loginPage.login(userData.username, userData.password);
});

Given(/^"(.*)" logs in with these mods$/, (userNameAlias, table) => {
    const modDataNames = dataManager.getDataTableColumnValues(table, 0);
    const userData = dataManager.getDataWithMods(userNameAlias, modDataNames);
    homePage.open();
    loginPage.login(userData.username, userData.password);
});

Given(/^"(.*)" logs in with this mod '(.*)'$/, (userNameAlias, modName) => {
    const userData = dataManager.getDataWithMods(userNameAlias, [modName]);
    homePage.open();
    loginPage.login(userData.username, userData.password);
});
```

### Page Objects Example

```javascript
// features/pageobjects/credit-form.page.ts
import Page from './page';

// The sections of the credit form mapped to URL paths
export enum FormSections {
    Personal = "user/form",
    Employment = "user/form/page2",
    Financial = "user/form/page3"
}

class CreditFormPage extends Page {

    get txtPageHelperTexts () { return $('.Mui-error') }

    // Personal section elements
    get tfFirstName () { return $('[name="firstName"]') }
    get txtFirstNameHelperText () { return $('#first-name-helper-text') }
    get tfMiddleInitial () { return $('[name="middleInitial"]') }
    get txtMiddleInitialHelperText () { return $('#middle-initial-helper-text') }
    get tfLastName () { return $('[name="lastName"]') }
    get txtLastNameHelperText () { return $('#last-name-helper-text') }
    get tfDateOfBirth () { return $('[name="dateOfBirth"]') }
    get txtDateOfBirthHelperText () { return $('#date-of-birth-helper-text') }
    get tfSsn () { return $('[name="ssn"]') }
    get txtSsnHelperText () { return $('#ssn-helper-text') }

    // Employment section elements
    get slctCountryOfCitizenShip () { return $('[name="countryOfCitizenShip"]') }
    get slctCountryOfCitizenShipSecondary () { return $('[name="countryOfCitizenShipSecondary"]') }
    get tfCurrentEmployerName () { return $('[name="currentEmployerName"]') }
    get tfWorkPhone () { return $('[name="workPhone"]') }
    get tfYearsEmployed () { return $('[name="yearsEmployed"]') }
    get tfMonthsEmployed () { return $('[name="monthsEmployed"]') }
    get tfOccupation () { return $('[name="occupation"]') }

    // Financial section elements
    get tfMonthlyIncome () { return $('[name="monthlyIncome"]') }
    get tfMonthlyHousingPayment () { return $('[name="monthlyHousingPayment"]') }
    get tfCheckingAmount () { return $('[name="checkingAmount"]') }
    get tfSavingsAmount () { return $('[name="savingsAmount"]') }
    get tfInvestmentsAmount () { return $('[name="investmentsAmount"]') }

    // Completion Page
    get txtResponseMsg () { return $('#response-msg') }
    get txtResponseTitle () { return $('#response-title') }

    get btnContinue () { return $('button[type="submit"]') }
    get btnSubmit () { return $('button[type="submit"]') }


    open () {
        super.open('user/form');
    }

    goToSection (section: FormSections) {
        super.open(section);
    }

    submitForm() {
        this.btnSubmit.click();
    }

    filloutForm (data) {
        this.filloutPersonalSection(data);
        this.btnContinue.click();
        this.filloutEmploymentSection(data);
        this.btnContinue.click();
        this.filloutFinancialSection(data);
    }
    
    filloutPersonalSection (data) {
        this.tfFirstName.setValue(data['firstName']);
        this.tfMiddleInitial.setValue(data['middleInitial']);
        this.tfLastName.setValue(data['lastName']);
        this.tfDateOfBirth.setValue(data['dateOfBirth']);
        this.tfSsn.setValue(data['ssn']);
    }

    filloutEmploymentSection(data) {
        this.slctCountryOfCitizenShip.selectByAttribute('value', data['countryOfCitizenShip']);
        this.slctCountryOfCitizenShipSecondary.selectByAttribute('value', data['countryOfCitizenShipSecondary']);
        this.tfCurrentEmployerName.setValue(data['currentEmployerName']);
        this.tfWorkPhone.setValue(data['workPhone']);
        this.tfYearsEmployed.setValue(data['yearsEmployed']);
        this.tfMonthsEmployed.setValue(data['monthsEmployed']);
        this.tfOccupation.setValue(data['occupation']);
    }

    filloutFinancialSection(data) {
        this.tfMonthlyIncome.setValue(data['monthlyIncome']);
        this.tfMonthlyHousingPayment.setValue(data['monthlyHousingPayment']);
        this.tfCheckingAmount.setValue(data['checkingAmount']);
        this.tfSavingsAmount.setValue(data['savingsAmount']);
        this.tfInvestmentsAmount.setValue(data['investmentsAmount']);
    }
}
export default new CreditFormPage();
```

### Features Test Data

Here is an example of features test data used by the `features` test suite. This data includes information about the user's financial details and other relevant information. Data consists of personas and data chunks. The example below has one persona followed by one data chunk. The persona is named "Kelly Baddy". The data chunk contains data used typically to modify a persona or can stand alone. Personas have a name and aliases. The data chunk contains name and no aliases.

```json
[
  {
      "name": "Kelly Baddy",
      "aliases": [
          "Kelly Baddy w/ the ability to break things"
      ],
      "firstName": "Kelly",
      "middleInitial": "A",
      "lastName": "Baddy",
      "dateOfBirth": "10/11/1980",
      "ssn": "555-22-5555",
      "countryOfCitizenShip": "GB",
      "countryOfCitizenShipSecondary": "US",
      "currentEmployerName": "Acme Oil",
      "workPhone": "(555)111-2222",
      "yearsEmployed": 10,
      "monthsEmployed": 1,
      "occupation": "CIO",
      "monthlyHousingPayment": 1800,
      "checkingAmount": 2000,
      "savingsAmount": 2000,
      "investmentsAmount": 20000,
      "monthlyIncome": 5000,
      "username": "kelly_baddy",
      "password": "GhekinIsFun"
  },
  {
      "name": "failing back-end ratio",
      "monthlyHousingPayment": 18001,
      "monthlyIncome": 50000
  }
]
```

## Implementation Priority

**CRITICAL**: Follow ATDD methodology strictly:

1. **Start by reading** a feature file completely from `features/*.feature`
2. **Implement scenarios in order** as listed in the feature file
3. **Do not proceed** to the next scenario until the current one passes
4. **Reference the feature file continuously** during implementation
5. **Validate behavior** matches the Gherkin scenarios exactly

All implementation must:

- **Satisfy the acceptance criteria** in the feature file scenarios
- Use functional programming patterns exclusively
- Include comprehensive error handling
- Provide clear progress feedback as specified in scenarios
- Handle all edge cases mentioned in the feature scenarios
- Pass both unit and acceptance tests

**NO EXCEPTIONS**: Code that doesn't pass quality checks cannot proceed to the next scenario.

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.