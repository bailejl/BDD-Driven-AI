# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Table of Contents

1. [Project Overview](#project-overview)
   - [Quick Start for New Developers](#quick-start-for-new-developers)
2. [🚨 MANDATORY WORKFLOW - NO EXCEPTIONS 🚨](#mandatory-workflow---no-exceptions)
3. [Commands](#commands)
4. [Development Approach](#development-approach)
5. [Architecture](#architecture)
6. [Technical Constraints](#technical-constraints)
7. [Security Standards](#security-standards)
8. [Implementation Process - ATDD Workflow](#implementation-process---atdd-workflow)
9. [Testing and Debugging](#testing-and-debugging)
10. [Success Criteria](#success-criteria)
11. [Important Instruction Reminders](#important-instruction-reminders)

## Project Overview

This is a Declarative Gherkin training project built with React, TypeScript, and Cucumber. It demonstrates how to write concise, business-readable test scenarios using the Declarative Gherkin methodology. The project uses a fictional "First Bank of Change" credit application as the demo application.

### Quick Start for New Developers

```bash
# Clone the repository
git clone https://github.com/bailejl/BDD-Driven-AI.git
cd BDD-Driven-AI

# One-command setup (installs dependencies, validates setup, runs all checks)
npm run setup

# Start development
npm run dev
```

**That's it!** The `npm run setup` command will:

1. Install all Node.js dependencies
2. Install Playwright browsers for E2E testing
3. Run type checking to ensure TypeScript is properly configured
4. Run ESLint to validate code quality standards
5. Run the full test suite with coverage to ensure everything works
6. Display next steps for development

## MANDATORY WORKFLOW - NO EXCEPTIONS

**CRITICAL**: 🚨 After EVERY single code change, you MUST run both test and quality scripts. This is NON-NEGOTIABLE.

### Required Commands After Every Change

All commands should be run from the **root directory**:

```bash
# 1. ALWAYS ensure code meet formatting standards.
npm run prettier:write

# 2. ALWAYS run tests first - NO EXCEPTIONS. CRITICAL - Check for warnings in logs and fix them. Ensure we have 90% or better coverage.
npm run test -- --coverage --verbose=false

# 3. ALWAYS run quality checks - NO EXCEPTIONS. CRITICAL - treat warnings like errors and fix them.
npm run lint

# 4. ALWAYS run comprehensive quality checks - NO EXCEPTIONS. CRITICAL - includes mega-linter security scans.
npm run lint:mega

# 5. ALWAYS run E2E tests - NO EXCEPTIONS. CRITICAL - Use PLAYWRIGHT_HTML_OPEN=never to stop it showing the HTML report, otherwise the process never ends.
npm run e2e:ci
```

### Workflow Enforcement Rules

1. **NEVER proceed to the next task** until `npm run test`, `npm run lint`, and `npm run lint:mega` all pass from the root directory
2. **NEVER skip this workflow** - even for "small changes" or "quick fixes"
3. **ALWAYS run the full test suite** - no selective testing
4. **ALWAYS verify quality standards** - no exceptions for any file type
5. **ALWAYS verify e2e before a push** ensure `npm run e2e:ci` passes from the root directory. Use PLAYWRIGHT_HTML_OPEN=never to stop it showing the HTML report, otherwise the process never ends.

### Quality Gates - ALL Must Pass

- ✅ **All tests pass**: `npm run test` returns success
- ✅ **No linting errors or warnings**: `npm run lint` and `npm run lint:mega` has no errors or warnings
- ✅ **Build succeeds**: `npm run build` completes successfully
- ✅ **Type checking passes**: `npm run type-check` finds no errors
- ✅ **Functional patterns**: Code follows functional programming constraints
- ✅ **No Warnings**: check logs of the Quality Gate processes and ensure there are no warnings. CRITICAL - treat warnings like errors.
- ✅ **90% Coverage**: Ensure test coverage meets or exceeds 90%

### Failure Response Protocol

If ANY quality gate fails:

1. **STOP** all other work immediately
2. **FIX** the failing quality check first
3. **RE-RUN** both test and quality scripts
4. **ONLY THEN** proceed with next task

## Commands

All commands should be run from the **root directory** (not from subdirectories):

### Setup Commands

- `npm run setup` - **One-command setup for new developers** (installs dependencies, validates setup, runs all checks)
- `npm run setup:install` - Install Node.js dependencies and Playwright browsers
- `npm run setup:validate` - Run type checking, linting, and tests to validate setup
- `npm run setup:complete` - Display setup completion message

### Development Commands

- `npm install` - Install Node.js dependencies only
- `npm run dev` - Start the React app with Vite (accessible at <http://localhost:4200>)
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build

### Testing Commands

#### Unit Testing

- `npm run test` - Run all unit tests with Jest
- `npm run test:watch` - Run tests in watch mode

#### E2E Testing

All `npm run e2e` commands automatically start the app for testing, so no need to run `npm run dev` before running the tests.

- `npm run e2e:ci` - Run full E2E test suite without HTML server, exit after all tests run (**RECOMMENDED FOR CI**)
- `npm run e2e` - Run full E2E test suite with HTML server, does not exit on failures. **IMPORTANT**: never run `npm run e2e` as it does not exit after tests are done, when failures are present.
- `npm run e2e:demo` - Run full E2E test suite with HTML server, which includes a failing scenario for training, so it will always fail.
- `npm run e2e:debug` - Run E2E tests with Playwright Inspector for debugging UI issues
- `npm run e2e:ui` - Run tests with Playwright's UI mode for interactive debugging
- `npm run snippets` - Generate Cucumber step definition snippets

**Note**: Use PLAYWRIGHT_HTML_OPEN=never to stop it showing the HTML report, otherwise the process never ends.

**Note**: If you are going to manually run `npx playwright test` of any type, ensure `PLAYWRIGHT_HTML_OPEN=never` is set. This causes the tests to exit immediately after completion, speeding up feedback loops.

### Quality Assurance Commands

- `npm run lint` - Run linting checks with ESLint
- `npm run lint:fix` - Fix auto-fixable linting issues
- `npm run lint:mega` - Run comprehensive MegaLinter security and quality scans
- `npm run type-check` - Run TypeScript type checking
- `npm run prettier:write` - Format code according to project standards

## Development Approach

**IMPORTANT**: This project uses Acceptance Test Driven Development (ATDD) as the primary workflow, with Test-Driven Development (TDD) practices for implementing features.

### ATDD + TDD Workflow

1. **Start with Acceptance Tests** (ATDD)

   - Read the feature specifications in `features/*.feature`
   - Review [docs/bdd-and-gherkin-guidance.md](docs/bdd-and-gherkin-guidance.md) to understand the feature files
   - Run E2E tests to see which scenarios are failing

2. **Implement Using TDD** (Red-Green-Refactor)

   - For each failing acceptance test, use TDD to implement the feature:
   - **Red**: Write a failing unit test for the required behavior
   - **Green**: Write the minimum code to make the test pass
   - **Refactor**: Improve the code while keeping tests green

3. **Validate Progress**
   - Ensure unit tests pass
   - Verify the acceptance test now passes
   - Run all quality checks before moving to the next scenario

**CRITICAL**: All development must satisfy the acceptance criteria defined in the feature files. No production code without a failing test first.

## Architecture

### Technology Stack

- **React 19**: Latest React with modern patterns
- **TypeScript 5**: Full type safety
- **Material-UI v6**: UI component library with Emotion styling
- **React Router v7**: Client-side routing
- **Vite**: Build tool and development server
- **Jest**: Unit testing framework
- **Playwright**: E2E testing framework
- **Cucumber**: BDD testing with Gherkin syntax

### Core Structure

- **Modern React App**: Simplified single-page application built with Vite
- **Source Structure**: All application code in `src/` directory
- **Component Organization**: Feature-based component structure
- **Modern Build System**: Vite for fast development and optimized production builds

### Directory Structure

```text
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

### Acceptance Test Architecture

- **Feature Files**: Located in `features/*.feature` using Declarative Gherkin syntax
- **Step Definitions**: Located in `features/step-definitions/`
- **Page Objects**: Located in `features/page-objects/` following Playwright patterns
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
- **Functional Programming**: Arrow functions and functional patterns throughout

### Acceptance Test Data Pattern

Test scenarios use personas with descriptive aliases like:

- "Tom Smith w/ minimum acceptable back-end ratio"
- "Lisa Mach w/ highest failing credit score"

This allows tests to be self-documenting and business-readable while referencing specific test data configurations.

## Technical Constraints

### Code Style Requirements

- **MANDATORY**: Use vanilla TypeScript
- **MANDATORY**: Implement functional programming patterns throughout
- **MANDATORY**: Use arrow functions exclusively for function definitions
- **MANDATORY**: Avoid classes - use factory functions and closures instead (code under `features` is acceptable for testing)
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

## Security Standards

### GitHub Actions Security

- **MANDATORY**: All workflows must have restrictive top-level permissions
- **MANDATORY**: No `write-all` permissions unless absolutely necessary
- **MANDATORY**: Workflow dispatch triggers must not have user-controllable inputs that affect build output
- **MANDATORY**: Follow principle of least privilege for all CI/CD processes

### Code Security

- **MANDATORY**: All code changes must pass MegaLinter security scans (`npm run lint:mega`)
- **MANDATORY**: No hardcoded secrets, tokens, or API keys in code
- **MANDATORY**: All dependencies must be audited for security vulnerabilities
- **MANDATORY**: Use `npm audit --audit-level=high` to check for critical vulnerabilities

### Current Security Compliance

- ✅ **Checkov Security**: 100% compliance with GitHub Actions security best practices
- ✅ **Workflow Permissions**: All workflows use minimum required permissions
- ✅ **Build Security**: No user-controllable parameters in build processes
- ✅ **Dependency Security**: Regular security audits via CI/CD pipeline

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

- **Review existing Cucumber step definitions** in `features/step-definitions/*.playwright.steps.ts`
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

### Implementation Priority

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

## Testing and Debugging

### Acceptance Test Setup

#### Prerequisites for E2E Testing

- Run `npm install` first to install dependencies
- Then run E2E tests to see failing scenarios

#### Step File Structure Example

```javascript
// features/step-definitions/common.playwright.steps.ts
import HomePage from '../page-objects/home.playwright.page';
import LoginPage from '../page-objects/login.playwright.page';
import { Given } from '../fixtures/test';

Given('{string} logs in', async ({ page, dataManager }, userNameAlias: string) => {
  const userData = dataManager.getData(userNameAlias, true);
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await homePage.open();
  await loginPage.login(userData.username, userData.password);
});

Given('{string} logs in with these mods', async ({ page, dataManager }, userNameAlias: string, table: any) => {
  const modDataNames = dataManager.getDataTableColumnValues(table, 0);
  const userData = dataManager.getDataWithMods(userNameAlias, modDataNames);
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await homePage.open();
  await loginPage.login(userData.username, userData.password);
});

Given('{string} logs in with this mod {string}', async ({ page, dataManager }, userNameAlias: string, modName: string) => {
  const userData = dataManager.getDataWithMods(userNameAlias, [modName]);
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await homePage.open();
  await loginPage.login(userData.username, userData.password);
});
```

### Features Test Data

Here is an example of features test data used by the `features` test suite. This data includes information about the user's financial details and other relevant information. Data consists of personas and data chunks. The example below has one persona followed by one data chunk. The persona is named "Kelly Baddy". The data chunk contains data used typically to modify a persona or can stand alone. Personas have a name and aliases. The data chunk contains name and no aliases.

```json
[
  {
    "name": "Kelly Baddy",
    "aliases": ["Kelly Baddy w/ the ability to break things"],
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
    "password": "GherkinIsFun"
  },
  {
    "name": "failing back-end ratio",
    "monthlyHousingPayment": 18001,
    "monthlyIncome": 50000
  }
]
```

### Browser Debugging for UI Issues

When working on UI issues, use the following approaches to see and interact with the browser:

#### Interactive Debugging Mode

```bash
# Debug all tests with browser visible
npm run e2e:debug

# Debug specific test scenarios
npx playwright test --grep "User sees errors" --debug

# Debug a specific feature file
npx playwright test features/credit-application.feature --debug
```

This opens the Playwright Inspector where you can:

- Step through each test action
- See the browser window
- Inspect elements and selectors
- Take screenshots at any point
- Modify timeouts on the fly

#### UI Mode for Visual Testing

```bash
# Run in UI mode for a visual test runner
npm run e2e:ui
```

This provides:

- Visual test tree
- Live browser preview
- Test execution timeline
- Error traces with screenshots
- Time-travel debugging

#### Headed Mode (Browser Always Visible)

```bash
# Run tests with browser visible (not in debug mode)
npx playwright test --headed

# Run specific browser
npx playwright test --headed --project=chromium
```

#### Taking Screenshots for Analysis

Add these to your test code when debugging:

```typescript
// Take a screenshot at any point
await page.screenshot({ path: 'screenshots/debug-issue.png' })

// Take full page screenshot
await page.screenshot({ path: 'screenshots/full-page.png', fullPage: true })

// Screenshot specific element
await page
  .locator('.error-message')
  .screenshot({ path: 'screenshots/error.png' })
```

#### Slow Down Execution

```bash
# Slow down execution to see what's happening
npx playwright test --headed --slow-mo=1000  # 1 second delay between actions
```

#### Browser Developer Tools

```typescript
// Pause test and open DevTools
await page.pause() // This will pause execution and let you inspect
```

### Claude Code Browser Usage

When Claude Code needs to debug UI issues, it can:

1. **Launch a visible browser** using `npm run e2e:debug` or `npx playwright test --headed`
2. **Take screenshots** during test execution to analyze UI problems
3. **Use the Read tool** to view screenshot files and understand visual issues
4. **Add pause points** in tests to inspect the browser state

Example workflow for Claude Code to debug UI issues:

```bash
# 1. Start the dev server (if needed)
npm run dev

# 2. Run specific test in debug mode
npx playwright test --grep "failing test name" --debug --project=chromium

# 3. Or take screenshots in the test code
await page.screenshot({ path: 'debug-screenshot.png' });

# 4. Use Read tool to view the screenshot
# Claude Code can then analyze the visual state
```

## Success Criteria

The application should satisfy ALL scenarios in `features/*.feature`:

**Each scenario must pass its acceptance criteria before the feature is considered complete.**

## Installing New Packages

CRITICAL - When installing new package, check to see if there is an ESLint rule set for it. This will ensure proper use of the new package.

## MCP Guidance

### Playwright MCP

Make sure the app is running using `npm run dev`, as needed. This will allow you to access the site via <http://localhost:4200>.

## Test-Driven Development (TDD) Practices

**TDD is MANDATORY** when implementing features to satisfy acceptance tests. Every line of production code must be written in response to a failing test.

### TDD Within ATDD

While ATDD drives the overall development process, TDD is how you implement each feature:

1. **Acceptance test fails** (ATDD level)
2. **Write unit tests** using TDD to build the feature
3. **Implement incrementally** until acceptance test passes

### Key TDD Principles

- Write tests first - no production code without a failing test
- Test behavior, not implementation
- No `any` types or type assertions
- Immutable data only
- Small, pure functions
- TypeScript strict mode always
- 90% coverage minimum through behavior testing

### Testing Principles

#### Behavior-Driven Testing

- Tests verify expected behavior, treating implementation as a black box
- Test through the public API exclusively - internals should be invisible to tests
- No 1:1 mapping between test files and implementation files
- Tests that examine internal implementation details are wasteful and should be avoided
- **Coverage target**: 90% minimum coverage through business behavior tests
- Tests must document expected business behavior

## TypeScript Guidelines

### Strict Mode Requirements

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

- **No `any`** - ever. Use `unknown` if type is truly unknown
- **No type assertions** (`as SomeType`) unless absolutely necessary with clear justification
- **No `@ts-ignore`** or `@ts-expect-error` without explicit explanation
- These rules apply to test code as well as production code

### Type Definitions

- **Prefer `type` over `interface`** in all cases
- Use explicit typing where it aids clarity, but leverage inference where appropriate
- Utilize utility types effectively (`Pick`, `Omit`, `Partial`, `Required`, etc.)
- Create domain-specific types (e.g., `UserId`, `PaymentId`) for type safety
- Create domain-specific types for type safety

```typescript
// Good - branded types for domain concepts
type ApplicantId = string & { readonly brand: unique symbol }
type CreditScore = number & { readonly brand: unique symbol }
type LoanAmount = number & { readonly brand: unique symbol }

// Avoid - generic types
type ApplicantId = string
type CreditScore = number
```

#### Type-Safe Domain Modeling

Define clear types for your domain:

```typescript
// Domain types for credit application
type CreditApplication = {
  applicantId: ApplicantId
  personalInfo: PersonalInfo
  employmentInfo: EmploymentInfo
  financialInfo: FinancialInfo
  status: ApplicationStatus
  submittedAt?: Date
}

type PersonalInfo = {
  firstName: string
  middleInitial?: string
  lastName: string
  dateOfBirth: string
  ssn: string
  citizenship: CountryCode
}

type EmploymentInfo = {
  employerName: string
  occupation: string
  yearsEmployed: number
  monthsEmployed: number
  monthlyIncome: number
}

type FinancialInfo = {
  monthlyHousingPayment: number
  checkingAmount: number
  savingsAmount: number
  investmentsAmount: number
}

type ApplicationStatus = 'draft' | 'submitted' | 'approved' | 'declined'
type CountryCode = 'US' | 'GB' | 'CA' | 'AU' | 'NZ'

// Factory functions for creating domain objects
export const createCreditApplication = (
  data: Partial<CreditApplication>
): CreditApplication => {
  return {
    applicantId: data.applicantId || generateApplicantId(),
    personalInfo: data.personalInfo || createEmptyPersonalInfo(),
    employmentInfo: data.employmentInfo || createEmptyEmploymentInfo(),
    financialInfo: data.financialInfo || createEmptyFinancialInfo(),
    status: data.status || 'draft',
    submittedAt: data.submittedAt,
  }
}
```

#### Type Usage in Tests

**CRITICAL**: Tests must use real types from the main project, not redefine their own.

```typescript
// ❌ WRONG - Defining types in test files
type CreditApplication = {
  id: string
  firstName: string
  // ... duplicated type definition
}

// ✅ CORRECT - Import types from the application
import { CreditApplication, PersonalInfo } from '@/types'
```

**Why this matters:**

- **Type Safety**: Ensures tests use the same types as production code
- **Consistency**: Changes to types automatically propagate to tests
- **Maintainability**: Single source of truth for data structures
- **Prevents Drift**: Tests can't accidentally diverge from real types

**Implementation:**

- All domain types should be exported from the types directory
- Test files should import types from the application
- Mock data factories should use the real types

```typescript
// ✅ CORRECT - Test factories using real types
import { CreditApplication, PersonalInfo } from '@/types'
import { testData } from '@/features/data/data.json'

const getMockApplication = (
  overrides?: Partial<CreditApplication>
): CreditApplication => {
  const tomSmithData = testData.find((d) => d.name === 'Tom Smith')

  return createCreditApplication({
    personalInfo: {
      firstName: tomSmithData.firstName,
      lastName: tomSmithData.lastName,
      // ... map test data to domain types
    },
    ...overrides,
  })
}
```

## Code Style

### Functional Programming

I follow a "functional light" approach:

- **No data mutation** - work with immutable data structures
- **Pure functions** wherever possible
- **Composition** as the primary mechanism for code reuse
- Avoid heavy FP abstractions (no need for complex monads or pipe/compose patterns) unless there is a clear advantage to using them
- Use array methods (`map`, `filter`, `reduce`) over imperative loops

#### Examples of Functional Patterns

```typescript
// Good - Pure function with immutable updates
const calculateCreditScore = (application: CreditApplication): number => {
  const { financialInfo, employmentInfo } = application

  // Immutable calculation based on financial ratios
  const debtToIncomeRatio =
    financialInfo.monthlyHousingPayment / employmentInfo.monthlyIncome
  const liquidAssets =
    financialInfo.checkingAmount + financialInfo.savingsAmount
  const employmentStability =
    employmentInfo.yearsEmployed + employmentInfo.monthsEmployed / 12

  // Simple scoring algorithm (example)
  let score = 700 // Base score
  score -= debtToIncomeRatio * 100
  score += Math.min(liquidAssets / 1000, 50)
  score += employmentStability * 10

  return Math.max(300, Math.min(850, Math.round(score)))
}

// Good - Composition for application processing
const processApplication = (
  application: CreditApplication
): CreditApplication => {
  const validated = validateApplication(application)
  const withScore = addCreditScore(validated)
  const withDecision = makeDecision(withScore)
  return withDecision
}

// Simple validation without heavy abstractions
const validateApplication = (app: CreditApplication): CreditApplication => {
  if (!app.personalInfo.ssn || !app.personalInfo.dateOfBirth) {
    throw new ValidationError('Missing required personal information')
  }

  if (app.employmentInfo.monthlyIncome <= 0) {
    throw new ValidationError('Invalid income amount')
  }

  return app
}
```

### Code Structure

- **No nested if/else statements** - use early returns, guard clauses, or composition
- **Avoid deep nesting** in general (max 2 levels)
- Keep functions small and focused on a single responsibility
- Prefer flat, readable code over clever abstractions

### Naming Conventions

- **Functions**: `camelCase`, verb-based (e.g., `calculateTotal`, `validatePayment`)
- **Types**: `PascalCase` (e.g., `PaymentRequest`, `UserProfile`)
- **Constants**: `UPPER_SNAKE_CASE` for true constants, `camelCase` for configuration
- **Files**: `kebab-case.ts` for all TypeScript files
- **Test files**: `*.test.ts` or `*.spec.ts`

### No Comments in Code

Code should be self-documenting through clear naming and structure. Comments indicate that the code itself is not clear enough.

```typescript
// Avoid: Comments explaining what the code does
const calculateDiscount = (price: number, customer: Customer): number => {
  // Check if customer is premium
  if (customer.tier === 'premium') {
    // Apply 20% discount for premium customers
    return price * 0.8
  }
  // Regular customers get 10% discount
  return price * 0.9
}

// Good: Self-documenting code with clear names
const PREMIUM_DISCOUNT_MULTIPLIER = 0.8
const STANDARD_DISCOUNT_MULTIPLIER = 0.9

const isPremiumCustomer = (customer: Customer): boolean => {
  return customer.tier === 'premium'
}

const calculateDiscount = (price: number, customer: Customer): number => {
  const discountMultiplier = isPremiumCustomer(customer)
    ? PREMIUM_DISCOUNT_MULTIPLIER
    : STANDARD_DISCOUNT_MULTIPLIER

  return price * discountMultiplier
}

// Avoid: Complex logic with comments
const processPayment = (payment: Payment): ProcessedPayment => {
  // First validate the payment
  if (!validatePayment(payment)) {
    throw new Error('Invalid payment')
  }

  // Check if we need to apply 3D secure
  if (payment.amount > 100 && payment.card.type === 'credit') {
    // Apply 3D secure for credit cards over £100
    const securePayment = apply3DSecure(payment)
    // Process the secure payment
    return executePayment(securePayment)
  }

  // Process the payment
  return executePayment(payment)
}

// Good: Extract to well-named functions
const requires3DSecure = (payment: Payment): boolean => {
  const SECURE_PAYMENT_THRESHOLD = 100
  return (
    payment.amount > SECURE_PAYMENT_THRESHOLD && payment.card.type === 'credit'
  )
}

const processPayment = (payment: Payment): ProcessedPayment => {
  if (!validatePayment(payment)) {
    throw new PaymentValidationError('Invalid payment')
  }

  const securedPayment = requires3DSecure(payment)
    ? apply3DSecure(payment)
    : payment

  return executePayment(securedPayment)
}
```

**Exception**: JSDoc comments for public APIs are acceptable when generating documentation, but the code should still be self-explanatory without them.

### Prefer Options Objects

Use options objects for function parameters as the default pattern. Only use positional parameters when there's a clear, compelling reason (e.g., single-parameter pure functions, well-established conventions like `map(item => item.value)`).

```typescript
// Avoid: Multiple positional parameters
const createPayment = (
  amount: number,
  currency: string,
  cardId: string,
  customerId: string,
  description?: string,
  metadata?: Record<string, unknown>,
  idempotencyKey?: string
): Payment => {
  // implementation
}

// Calling it is unclear
const payment = createPayment(
  100,
  'GBP',
  'card_123',
  'customer_456',
  undefined,
  { orderId: 'order_789' },
  'key_123'
)

// Good: Options object with clear property names
type CreatePaymentOptions = {
  amount: number
  currency: string
  cardId: string
  customerId: string
  description?: string
  metadata?: Record<string, unknown>
  idempotencyKey?: string
}

const createPayment = (options: CreatePaymentOptions): Payment => {
  const {
    amount,
    currency,
    cardId,
    customerId,
    description,
    metadata,
    idempotencyKey,
  } = options

  // implementation
}

// Clear and readable at call site
const payment = createPayment({
  amount: 100,
  currency: 'GBP',
  cardId: 'card_123',
  customerId: 'customer_456',
  metadata: { orderId: 'order_789' },
  idempotencyKey: 'key_123',
})

// Avoid: Boolean flags as parameters
const fetchCustomers = (
  includeInactive: boolean,
  includePending: boolean,
  includeDeleted: boolean,
  sortByDate: boolean
): Customer[] => {
  // implementation
}

// Confusing at call site
const customers = fetchCustomers(true, false, false, true)

// Good: Options object with clear intent
type FetchCustomersOptions = {
  includeInactive?: boolean
  includePending?: boolean
  includeDeleted?: boolean
  sortBy?: 'date' | 'name' | 'value'
}

const fetchCustomers = (options: FetchCustomersOptions = {}): Customer[] => {
  const {
    includeInactive = false,
    includePending = false,
    includeDeleted = false,
    sortBy = 'name',
  } = options

  // implementation
}

// Self-documenting at call site
const customers = fetchCustomers({
  includeInactive: true,
  sortBy: 'date',
})

// Good: Configuration objects for complex operations
type ProcessOrderOptions = {
  order: Order
  shipping: {
    method: 'standard' | 'express' | 'overnight'
    address: Address
  }
  payment: {
    method: PaymentMethod
    saveForFuture?: boolean
  }
  promotions?: {
    codes?: string[]
    autoApply?: boolean
  }
}

const processOrder = (options: ProcessOrderOptions): ProcessedOrder => {
  const { order, shipping, payment, promotions = {} } = options

  // Clear access to nested options
  const orderWithPromotions = promotions.autoApply
    ? applyAvailablePromotions(order)
    : order

  return executeOrder({
    ...orderWithPromotions,
    shippingMethod: shipping.method,
    paymentMethod: payment.method,
  })
}

// Acceptable: Single parameter for simple transforms
const double = (n: number): number => n * 2
const getName = (user: User): string => user.name

// Acceptable: Well-established patterns
const numbers = [1, 2, 3]
const doubled = numbers.map((n) => n * 2)
const users = fetchUsers()
const names = users.map((user) => user.name)
```

**Guidelines for options objects:**

- Default to options objects unless there's a specific reason not to
- Always use for functions with optional parameters
- Destructure options at the start of the function for clarity
- Provide sensible defaults using destructuring
- Keep related options grouped (e.g., all shipping options together)
- Consider breaking very large options objects into nested groups

**When positional parameters are acceptable:**

- Single-parameter pure functions
- Well-established functional patterns (map, filter, reduce callbacks)
- Mathematical operations where order is conventional

## Development Workflow

### TDD Process - THE FUNDAMENTAL PRACTICE

**CRITICAL**: TDD is not optional. Every feature, every bug fix, every change MUST follow this process:

Follow Red-Green-Refactor strictly:

1. **Red**: Write a failing test for the desired behavior. NO PRODUCTION CODE until you have a failing test.
2. **Green**: Write the MINIMUM code to make the test pass. Resist the urge to write more than needed.
3. **Refactor**: Assess the code for improvement opportunities. If refactoring would add value, clean up the code while keeping tests green. If the code is already clean and expressive, move on.

**Common TDD Violations to Avoid:**

- Writing production code without a failing test first
- Writing multiple tests before making the first one pass
- Writing more production code than needed to pass the current test
- Skipping the refactor assessment step when code could be improved
- Adding functionality "while you're there" without a test driving it

**Remember**: If you're typing production code and there isn't a failing test demanding that code, you're not doing TDD.

#### TDD Example Workflow

```typescript
// Step 1: Red - Start with the simplest behavior
describe('Order processing', () => {
  it('should calculate total with shipping cost', () => {
    const order = createOrder({
      items: [{ price: 30, quantity: 1 }],
      shippingCost: 5.99,
    })

    const processed = processOrder(order)

    expect(processed.total).toBe(35.99)
    expect(processed.shippingCost).toBe(5.99)
  })
})

// Step 2: Green - Minimal implementation
const processOrder = (order: Order): ProcessedOrder => {
  const itemsTotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return {
    ...order,
    shippingCost: order.shippingCost,
    total: itemsTotal + order.shippingCost,
  }
}

// Step 3: Red - Add test for free shipping behavior
describe('Order processing', () => {
  it('should calculate total with shipping cost', () => {
    // ... existing test
  })

  it('should apply free shipping for orders over £50', () => {
    const order = createOrder({
      items: [{ price: 60, quantity: 1 }],
      shippingCost: 5.99,
    })

    const processed = processOrder(order)

    expect(processed.shippingCost).toBe(0)
    expect(processed.total).toBe(60)
  })
})

// Step 4: Green - NOW we can add the conditional because both paths are tested
const processOrder = (order: Order): ProcessedOrder => {
  const itemsTotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const shippingCost = itemsTotal > 50 ? 0 : order.shippingCost

  return {
    ...order,
    shippingCost,
    total: itemsTotal + shippingCost,
  }
}

// Step 5: Add edge case tests to ensure 100% behavior coverage
describe('Order processing', () => {
  // ... existing tests

  it('should charge shipping for orders exactly at £50', () => {
    const order = createOrder({
      items: [{ price: 50, quantity: 1 }],
      shippingCost: 5.99,
    })

    const processed = processOrder(order)

    expect(processed.shippingCost).toBe(5.99)
    expect(processed.total).toBe(55.99)
  })
})

// Step 6: Refactor - Extract constants and improve readability
const FREE_SHIPPING_THRESHOLD = 50

const calculateItemsTotal = (items: OrderItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

const qualifiesForFreeShipping = (itemsTotal: number): boolean => {
  return itemsTotal > FREE_SHIPPING_THRESHOLD
}

const processOrder = (order: Order): ProcessedOrder => {
  const itemsTotal = calculateItemsTotal(order.items)
  const shippingCost = qualifiesForFreeShipping(itemsTotal)
    ? 0
    : order.shippingCost

  return {
    ...order,
    shippingCost,
    total: itemsTotal + shippingCost,
  }
}
```

### Refactoring - The Critical Third Step

Evaluating refactoring opportunities is not optional - it's the third step in the TDD cycle. After achieving a green state and committing your work, you MUST assess whether the code can be improved. However, only refactor if there's clear value - if the code is already clean and expresses intent well, move on to the next test.

#### What is Refactoring?

Refactoring means changing the internal structure of code without changing its external behavior. The public API remains unchanged, all tests continue to pass, but the code becomes cleaner, more maintainable, or more efficient. Remember: only refactor when it genuinely improves the code - not all code needs refactoring.

#### When to Refactor

- **Always assess after green**: Once tests pass, before moving to the next test, evaluate if refactoring would add value
- **When you see duplication**: But understand what duplication really means (see DRY below)
- **When names could be clearer**: Variable names, function names, or type names that don't clearly express intent
- **When structure could be simpler**: Complex conditional logic, deeply nested code, or long functions
- **When patterns emerge**: After implementing several similar features, useful abstractions may become apparent

**Remember**: Not all code needs refactoring. If the code is already clean, expressive, and well-structured, commit and move on. Refactoring should improve the code - don't change things just for the sake of change.

#### Refactoring Guidelines

##### 1. Commit Before Refactoring

Always commit your working code before starting any refactoring. This gives you a safe point to return to:

```bash
git add .
git commit -m "feat: add payment validation"
# Now safe to refactor
```

##### 2. Look for Useful Abstractions Based on Semantic Meaning

Create abstractions only when code shares the same semantic meaning and purpose. Don't abstract based on structural similarity alone - **duplicate code is far cheaper than the wrong abstraction**.

```typescript
// Similar structure, DIFFERENT semantic meaning - DO NOT ABSTRACT
const validatePaymentAmount = (amount: number): boolean => {
  return amount > 0 && amount <= 10000
}

const validateTransferAmount = (amount: number): boolean => {
  return amount > 0 && amount <= 10000
}

// These might have the same structure today, but they represent different
// business concepts that will likely evolve independently.
// Payment limits might change based on fraud rules.
// Transfer limits might change based on account type.
// Abstracting them couples unrelated business rules.

// Similar structure, SAME semantic meaning - SAFE TO ABSTRACT
const formatUserDisplayName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`.trim()
}

const formatCustomerDisplayName = (
  firstName: string,
  lastName: string
): string => {
  return `${firstName} ${lastName}`.trim()
}

const formatEmployeeDisplayName = (
  firstName: string,
  lastName: string
): string => {
  return `${firstName} ${lastName}`.trim()
}

// These all represent the same concept: "how we format a person's name for display"
// They share semantic meaning, not just structure
const formatPersonDisplayName = (
  firstName: string,
  lastName: string
): string => {
  return `${firstName} ${lastName}`.trim()
}

// Replace all call sites throughout the codebase:
// Before:
// const userLabel = formatUserDisplayName(user.firstName, user.lastName);
// const customerName = formatCustomerDisplayName(customer.firstName, customer.lastName);
// const employeeTag = formatEmployeeDisplayName(employee.firstName, employee.lastName);

// After:
// const userLabel = formatPersonDisplayName(user.firstName, user.lastName);
// const customerName = formatPersonDisplayName(customer.firstName, customer.lastName);
// const employeeTag = formatPersonDisplayName(employee.firstName, employee.lastName);

// Then remove the original functions as they're no longer needed
```

**Questions to ask before abstracting:**

- Do these code blocks represent the same concept or different concepts that happen to look similar?
- If the business rules for one change, should the others change too?
- Would a developer reading this abstraction understand why these things are grouped together?
- Am I abstracting based on what the code IS (structure) or what it MEANS (semantics)?

**Remember**: It's much easier to create an abstraction later when the semantic relationship becomes clear than to undo a bad abstraction that couples unrelated concepts.

##### 3. Understanding DRY - It's About Knowledge, Not Code

DRY (Don't Repeat Yourself) is about not duplicating **knowledge** in the system, not about eliminating all code that looks similar.

```typescript
// This is NOT a DRY violation - different knowledge despite similar code
const validateUserAge = (age: number): boolean => {
  return age >= 18 && age <= 100
}

const validateProductRating = (rating: number): boolean => {
  return rating >= 1 && rating <= 5
}

const validateYearsOfExperience = (years: number): boolean => {
  return years >= 0 && years <= 50
}

// These functions have similar structure (checking numeric ranges), but they
// represent completely different business rules:
// - User age has legal requirements (18+) and practical limits (100)
// - Product ratings follow a 1-5 star system
// - Years of experience starts at 0 with a reasonable upper bound
// Abstracting them would couple unrelated business concepts and make future
// changes harder. What if ratings change to 1-10? What if legal age changes?

// Another example of code that looks similar but represents different knowledge:
const formatUserDisplayName = (user: User): string => {
  return `${user.firstName} ${user.lastName}`.trim()
}

const formatAddressLine = (address: Address): string => {
  return `${address.street} ${address.number}`.trim()
}

const formatCreditCardLabel = (card: CreditCard): string => {
  return `${card.type} ${card.lastFourDigits}`.trim()
}

// Despite the pattern "combine two strings with space and trim", these represent
// different domain concepts with different future evolution paths

// This IS a DRY violation - same knowledge in multiple places
const isHighRiskApplicant = (score: number): boolean => {
  return score < 620 // Knowledge duplicated!
}

const getDecisionMessage = (score: number): string => {
  if (score < 620) {
    // Same knowledge!
    return 'Application declined due to credit risk'
  }
  return 'Application approved'
}

const calculateInterestRate = (score: number): number => {
  if (score < 620) {
    // Same knowledge again!
    return 0 // No loan offered
  }
  return baseRateForScore(score)
}

// Refactored - knowledge in one place
const MINIMUM_CREDIT_SCORE = 620
const EXCELLENT_CREDIT_SCORE = 750

const getCreditTier = (
  score: number
): 'declined' | 'standard' | 'preferred' | 'excellent' => {
  if (score < MINIMUM_CREDIT_SCORE) return 'declined'
  if (score < 680) return 'standard'
  if (score < EXCELLENT_CREDIT_SCORE) return 'preferred'
  return 'excellent'
}

// Now all functions use the single source of truth
const isHighRiskApplicant = (score: number): boolean => {
  return getCreditTier(score) === 'declined'
}

const getDecisionMessage = (score: number): string => {
  const tier = getCreditTier(score)
  return tier === 'declined'
    ? 'Application declined due to credit risk'
    : `Application approved - ${tier} tier`
}
```

##### 4. Maintain External APIs During Refactoring

Refactoring must never break existing consumers of your code:

```typescript
// Original implementation
export const processPayment = (payment: Payment): ProcessedPayment => {
  // Complex logic all in one function
  if (payment.amount <= 0) {
    throw new Error('Invalid amount')
  }

  if (payment.amount > 10000) {
    throw new Error('Amount too large')
  }

  // ... 50 more lines of validation and processing

  return result
}

// Refactored - external API unchanged, internals improved
export const processPayment = (payment: Payment): ProcessedPayment => {
  validatePaymentAmount(payment.amount)
  validatePaymentMethod(payment.method)

  const authorizedPayment = authorizePayment(payment)
  const capturedPayment = capturePayment(authorizedPayment)

  return generateReceipt(capturedPayment)
}

// New internal functions - not exported
const validatePaymentAmount = (amount: number): void => {
  if (amount <= 0) {
    throw new Error('Invalid amount')
  }

  if (amount > 10000) {
    throw new Error('Amount too large')
  }
}

// Tests continue to pass without modification because external API unchanged
```

##### 5. Verify and Commit After Refactoring

**CRITICAL**: After every refactoring:

1. Run all tests - they must pass without modification
2. Run static analysis (linting, type checking) - must pass
3. Commit the refactoring separately from feature changes

```bash
# After refactoring
npm test          # All tests must pass
npm run lint      # All linting must pass
npm run typecheck # TypeScript must be happy

# Only then commit
git add .
git commit -m "refactor: extract payment validation helpers"
```

#### Refactoring Checklist

Before considering refactoring complete, verify:

- [ ] The refactoring actually improves the code (if not, don't refactor)
- [ ] All tests still pass without modification
- [ ] All static analysis tools pass (linting, type checking)
- [ ] No new public APIs were added (only internal ones)
- [ ] Code is more readable than before
- [ ] Any duplication removed was duplication of knowledge, not just code
- [ ] No speculative abstractions were created
- [ ] The refactoring is committed separately from feature changes

#### Example Refactoring Session

```typescript
// After getting tests green with minimal implementation:
describe('Order processing', () => {
  it('calculates total with items and shipping', () => {
    const order = { items: [{ price: 30 }, { price: 20 }], shipping: 5 }
    expect(calculateOrderTotal(order)).toBe(55)
  })

  it('applies free shipping over £50', () => {
    const order = { items: [{ price: 30 }, { price: 25 }], shipping: 5 }
    expect(calculateOrderTotal(order)).toBe(55)
  })
})

// Green implementation (minimal):
const calculateOrderTotal = (order: Order): number => {
  const itemsTotal = order.items.reduce((sum, item) => sum + item.price, 0)
  const shipping = itemsTotal > 50 ? 0 : order.shipping
  return itemsTotal + shipping
}

// Commit the working version
// git commit -m "feat: implement order total calculation with free shipping"

// Assess refactoring opportunities:
// - The variable names could be clearer
// - The free shipping threshold is a magic number
// - The calculation logic could be extracted for clarity
// These improvements would add value, so proceed with refactoring:

const FREE_SHIPPING_THRESHOLD = 50

const calculateItemsTotal = (items: OrderItem[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0)
}

const calculateShipping = (
  baseShipping: number,
  itemsTotal: number
): number => {
  return itemsTotal > FREE_SHIPPING_THRESHOLD ? 0 : baseShipping
}

const calculateOrderTotal = (order: Order): number => {
  const itemsTotal = calculateItemsTotal(order.items)
  const shipping = calculateShipping(order.shipping, itemsTotal)
  return itemsTotal + shipping
}

// Run tests - they still pass!
// Run linting - all clean!
// Run type checking - no errors!

// Now commit the refactoring
// git commit -m "refactor: extract order total calculation helpers"
```

##### Example: When NOT to Refactor

```typescript
// After getting this test green:
describe('Discount calculation', () => {
  it('should apply 10% discount', () => {
    const originalPrice = 100
    const discountedPrice = applyDiscount(originalPrice, 0.1)
    expect(discountedPrice).toBe(90)
  })
})

// Green implementation:
const applyDiscount = (price: number, discountRate: number): number => {
  return price * (1 - discountRate)
}

// Assess refactoring opportunities:
// - Code is already simple and clear
// - Function name clearly expresses intent
// - Implementation is a straightforward calculation
// - No magic numbers or unclear logic
// Conclusion: No refactoring needed. This is fine as-is.

// Commit and move to the next test
// git commit -m "feat: add discount calculation"
```

### Commit Guidelines

- Each commit should represent a complete, working change
- Use conventional commits format:

  ```text
  feat: add payment validation
  fix: correct date formatting in payment processor
  refactor: extract payment validation logic
  test: add edge cases for payment validation
  ```

- Include test changes with feature changes in the same commit

### Pull Request Standards

- Every PR must have all tests passing
- All linting and quality checks must pass
- Work in small increments that maintain a working state
- PRs should be focused on a single feature or fix
- Include description of the behavior change, not implementation details

## Working with This Codebase

### Development Workflow Summary

1. **Start with ATDD**: Read feature files, understand acceptance criteria
2. **Use TDD for Implementation**: Red-Green-Refactor for each feature
3. **Follow Functional Patterns**: No classes in production code
4. **Run Quality Checks**: After every change, no exceptions
5. **Maintain 90% Coverage**: Through behavior tests, not implementation tests

### Key Reminders

- **ATDD drives development** - acceptance tests define what to build
- **TDD implements features** - no production code without failing test first
- **Functional programming only** in `src/` - classes allowed only in `features/`
- **Quality gates are mandatory** - run all checks after every change
- **Test behavior, not implementation** - 90% coverage through business tests

## Example Patterns

### Error Handling

Use early returns with clear error messages:

```typescript
// Good - early returns with exceptions
const submitCreditApplication = (
  application: CreditApplication
): CreditApplication => {
  if (!isComplete(application)) {
    throw new ValidationError('Application is incomplete')
  }

  if (application.status !== 'draft') {
    throw new ApplicationError('Application has already been submitted')
  }

  const score = calculateCreditScore(application)

  if (score < MINIMUM_CREDIT_SCORE) {
    throw new DecisionError('Credit score does not meet minimum requirements')
  }

  return {
    ...application,
    status: 'submitted',
    submittedAt: new Date(),
  }
}

// Good - validation with descriptive errors
const validateSSN = (ssn: string): void => {
  const ssnPattern = /^\d{3}-\d{2}-\d{4}$/

  if (!ssn) {
    throw new ValidationError('SSN is required')
  }

  if (!ssnPattern.test(ssn)) {
    throw new ValidationError('SSN must be in format XXX-XX-XXXX')
  }
}
```

### Testing Behavior

```typescript
// Good - tests behavior through public API
describe('Credit Application Processing', () => {
  it('should decline application when credit score is below minimum', () => {
    const application = getMockApplication({
      employmentInfo: {
        monthlyIncome: 2000,
        yearsEmployed: 1,
      },
      financialInfo: {
        monthlyHousingPayment: 1900, // Very high debt ratio
        checkingAmount: 100,
        savingsAmount: 0,
      },
    })

    expect(() => submitCreditApplication(application)).toThrow(
      'Credit score does not meet minimum requirements'
    )
  })

  it('should approve application with good financial standing', () => {
    const application = getMockApplication({
      employmentInfo: {
        monthlyIncome: 8000,
        yearsEmployed: 5,
      },
      financialInfo: {
        monthlyHousingPayment: 1500,
        checkingAmount: 10000,
        savingsAmount: 25000,
      },
    })

    const result = submitCreditApplication(application)

    expect(result.status).toBe('submitted')
    expect(result.submittedAt).toBeDefined()
  })
})

// Avoid - testing implementation details
describe('Credit Application', () => {
  it('should call calculateDebtRatio method', () => {
    // This tests implementation, not behavior
  })
})
```

#### Achieving 90% Coverage Through Business Behavior

Example showing how validation code gets covered without testing it directly:

```typescript
// application-validator.ts (implementation detail)
const validateIncome = (income: number): boolean => {
  return income >= 2000 && income <= 1000000
}

const validateEmploymentLength = (years: number, months: number): boolean => {
  const totalMonths = years * 12 + months
  return totalMonths >= 6 // Minimum 6 months employment
}

// application-processor.ts (public API)
export const processApplication = (
  app: CreditApplication
): CreditApplication => {
  // Validation is used internally but not exposed
  if (!validateIncome(app.employmentInfo.monthlyIncome)) {
    throw new ValidationError('Income must be between $2,000 and $1,000,000')
  }

  if (
    !validateEmploymentLength(
      app.employmentInfo.yearsEmployed,
      app.employmentInfo.monthsEmployed
    )
  ) {
    throw new ValidationError('Minimum 6 months employment required')
  }

  // Process application...
  return {
    ...app,
    status: 'submitted',
    submittedAt: new Date(),
  }
}

// application-processor.test.ts
describe('Application processing', () => {
  // These tests achieve 90%+ coverage of validation code
  // without directly testing the validator functions

  it('should reject applications with income below minimum', () => {
    const app = getMockApplication({
      employmentInfo: { monthlyIncome: 1500 },
    })

    expect(() => processApplication(app)).toThrow(
      'Income must be between $2,000 and $1,000,000'
    )
  })

  it('should reject applications with insufficient employment history', () => {
    const app = getMockApplication({
      employmentInfo: { yearsEmployed: 0, monthsEmployed: 3 },
    })

    expect(() => processApplication(app)).toThrow(
      'Minimum 6 months employment required'
    )
  })

  it('should process valid applications successfully', () => {
    const app = getMockApplication({
      employmentInfo: {
        monthlyIncome: 5000,
        yearsEmployed: 2,
        monthsEmployed: 3,
      },
    })

    const result = processApplication(app)

    expect(result.status).toBe('submitted')
    expect(result.submittedAt).toBeDefined()
  })
})
```

### React Component Testing

```typescript
// Good - testing user-visible behavior
describe('CreditApplicationForm', () => {
  it('should show error when submitting incomplete form', async () => {
    render(<CreditApplicationForm />);

    const submitButton = screen.getByRole('button', { name: 'Submit Application' });
    await userEvent.click(submitButton);

    expect(screen.getByText('Please fill in all required fields')).toBeInTheDocument();
  });

  it('should show validation error for invalid SSN format', async () => {
    render(<CreditApplicationForm />);

    const ssnInput = screen.getByLabelText('Social Security Number');
    await userEvent.type(ssnInput, '123456789'); // Missing dashes
    await userEvent.tab(); // Trigger blur validation

    expect(screen.getByText('SSN must be in format XXX-XX-XXXX')).toBeInTheDocument();
  });
});
```

## Common Patterns to Avoid

### Anti-patterns

```typescript
// Avoid: Mutation
const addItem = (items: Item[], newItem: Item) => {
  items.push(newItem) // Mutates array
  return items
}

// Prefer: Immutable update
const addItem = (items: Item[], newItem: Item): Item[] => {
  return [...items, newItem]
}

// Avoid: Nested conditionals
if (user) {
  if (user.isActive) {
    if (user.hasPermission) {
      // do something
    }
  }
}

// Prefer: Early returns
if (!user || !user.isActive || !user.hasPermission) {
  return
}
// do something

// Avoid: Large functions
const processOrder = (order: Order) => {
  // 100+ lines of code
}

// Prefer: Composed small functions
const processOrder = (order: Order) => {
  const validatedOrder = validateOrder(order)
  const pricedOrder = calculatePricing(validatedOrder)
  const finalOrder = applyDiscounts(pricedOrder)
  return submitOrder(finalOrder)
}
```

## Important Instruction Reminders

Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (\*.md) or README files. Only create documentation files if explicitly requested by the User.
