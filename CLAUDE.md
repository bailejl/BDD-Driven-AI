# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Table of Contents

1. [Project Overview](#project-overview)
2. [🚨 MANDATORY WORKFLOW - NO EXCEPTIONS 🚨](#mandatory-workflow---no-exceptions)
3. [Commands](#commands)
4. [Development Approach](#development-approach)
5. [Architecture](#architecture)
6. [Technical Constraints](#technical-constraints)
7. [Implementation Process - ATDD Workflow](#implementation-process---atdd-workflow)
8. [Testing and Debugging](#testing-and-debugging)
9. [TDD Practices](#tdd-practices)
10. [TypeScript Guidelines](#typescript-guidelines)
11. [Code Style](#code-style)
12. [Refactoring Guidelines](#refactoring-guidelines)

## Project Overview

This is a Declarative Gherkin training project built with React, TypeScript, and Cucumber. It demonstrates business-readable test scenarios using the Declarative Gherkin methodology with a fictional "First Bank of Change" credit application.

### Quick Start

```bash
# Clone and setup
git clone https://github.com/bailejl/BDD-Driven-AI.git
cd BDD-Driven-AI
npm run setup  # One-command setup: installs deps, validates, runs checks

# Start development
npm run dev
```

## MANDATORY WORKFLOW - NO EXCEPTIONS

**CRITICAL**: 🚨 After EVERY code change, run ALL quality checks. NO EXCEPTIONS.

### Required Commands After Every Change

```bash
# Run from root directory only
npm run prettier:write                        # 1. Format code
npm run test -- --coverage --verbose=false    # 2. Run tests (90%+ coverage required)
npm run lint                                  # 3. ESLint (treat warnings as errors)
npm run lint:mega                             # 4. Security scans
npm run e2e:ci                                # 5. E2E tests (use PLAYWRIGHT_HTML_OPEN=never)
```

### Quality Gates - ALL Must Pass

- ✅ All tests pass with 90%+ coverage
- ✅ No linting errors or warnings
- ✅ Build succeeds
- ✅ Type checking passes
- ✅ Functional patterns followed

### Failure Protocol

1. **STOP** all work immediately
2. **FIX** the failing check first
3. **RE-RUN** all quality scripts
4. **ONLY THEN** proceed

## Commands

All commands run from **root directory**:

### Setup

- `npm run setup` - Complete setup for new developers
- `npm run setup:validate` - Validate environment

### Development

- `npm run dev` - Start app (<http://localhost:4200>)
- `npm run build` - Production build
- `npm run preview` - Preview build

### Testing

- `npm run test` - Unit tests with Jest
- `npm run test:watch` - Watch mode
- `npm run e2e:ci` - E2E tests for CI (exits properly)
- `npm run e2e:debug` - Debug with Playwright Inspector
- `npm run e2e:ui` - Interactive UI mode

**Note**: Use `PLAYWRIGHT_HTML_OPEN=never` to prevent hanging on HTML report.

### Quality

- `npm run lint` - ESLint checks
- `npm run lint:mega` - MegaLinter security scans
- `npm run type-check` - TypeScript checking
- `npm run prettier:write` - Format code

## Development Approach

**ATDD (Acceptance Test Driven Development)** drives development with **TDD** for implementation.

### Workflow

1. **Start with Acceptance Tests** (ATDD)
   - Read feature files in `features/*.feature`
     - **CRITICAL**: read `docs/bdd-and-gherkin-guidance.md` to understand concise decalarative gherkin, which is the BDD used for e2e.
     - **CRITICAL**: read `docs/playwright-guidance.md` to understand how to use Playwright.
   - Run E2E tests to see failures

2. **Implement Using TDD** (Red-Green-Refactor)
   - Write failing unit test
   - Write minimum code to pass
   - Refactor if beneficial

3. **Validate Progress**
   - All tests pass
   - Quality checks pass
   - Move to next scenario

**CRITICAL**: No production code shall pass a failing quality gate.

## Architecture

### Technology Stack

- **React 19** with modern patterns
- **TypeScript 5** with strict mode
- **Material-UI v6** for UI
- **Vite** for builds
- **Jest** + **Playwright** + **Cucumber** for testing

### Directory Structure

```text
src/
├── components/      # Feature-organized React components
├── services/        # Business logic
├── types/           # TypeScript types
└── utils/           # Utilities

features/
├── *.feature        # Gherkin scenarios
├── step-definitions/# Cucumber steps
├── page-objects/    # Playwright pages
└── data/data.json   # Test data
```

### Key Patterns

- **Declarative Gherkin**: Business-readable scenarios
- **Centralized Test Data**: Personas with descriptive aliases
- **Functional Programming**: No classes in production code

## Technical Constraints

### Mandatory Code Style

- Vanilla TypeScript only
- Arrow functions exclusively
- Functional patterns (no classes in `src/`)
- No semicolons
- Single quotes
- 2-space indentation
- 80-character line limit

### Security Requirements

- MegaLinter security scans must pass
- No hardcoded secrets
- Minimum permissions in CI/CD
- Regular dependency audits

## Implementation Process - ATDD Workflow

### 1. Scenario Analysis

- Read Gherkin scenarios completely
- Identify Given/When/Then criteria
- Note test data in `features/data/data.json`

### 2. Implementation

- Review existing step definitions
- Run E2E tests to see failures
- Implement features to make tests pass
- Run quality checks after each test passes

### 3. Validation

- Each scenario passes completely
- All quality checks pass
- Implementation matches expected behavior

**NO EXCEPTIONS**: Code must pass quality checks before proceeding.

## Testing and Debugging

### E2E Test Data Pattern

Test data uses personas with descriptive aliases:

```json
{
  "name": "Tom Smith",
  "aliases": ["Tom Smith w/ minimum acceptable back-end ratio"],
  "monthlyIncome": 5000,
  "monthlyHousingPayment": 1800
}
```

### Browser Debugging

```bash
# Debug with browser visible
npm run e2e:debug 
npx playwright test --grep "test name" --debug # Set PLAYWRIGHT_HTML_OPEN=never to ensure playwright immediately shutsdown after testing is complete.

# UI mode for visual testing
npm run e2e:ui

# Screenshots in tests
await page.screenshot({ path: 'debug.png' })
```

## TDD Practices

**TDD is MANDATORY**. Follow Red-Green-Refactor strictly:

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

### Key Principles

- Test behavior, not implementation
- No `any` types
- 90% coverage minimum
- Pure functions
- Immutable data

### Example TDD Flow

```typescript
// 1. Red - Failing test
it('should calculate total with shipping', () => {
  const order = { items: [{ price: 30 }], shipping: 5 }
  expect(calculateTotal(order)).toBe(35)
})

// 2. Green - Minimal implementation
const calculateTotal = (order) => {
  return order.items[0].price + order.shipping
}

// 3. Refactor if beneficial
const calculateTotal = (order) => {
  const itemsTotal = order.items.reduce((sum, item) => sum + item.price, 0)
  return itemsTotal + order.shipping
}
```

## TypeScript Guidelines

### Strict Mode Required

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### Type Rules

- **No `any`** - use `unknown` if needed
- **Prefer `type` over `interface`**
- **No type assertions** unless justified
- **Import types from application** in tests

### Domain Modeling

```typescript
// Good - Domain types
type CreditApplication = {
  personalInfo: PersonalInfo
  employmentInfo: EmploymentInfo
  status: ApplicationStatus
}

type ApplicationStatus = 'draft' | 'submitted' | 'approved' | 'declined'

// Factory functions
export const createApplication = (
  data: Partial<CreditApplication>
): CreditApplication => ({
  personalInfo: data.personalInfo || createEmptyPersonalInfo(),
  employmentInfo: data.employmentInfo || createEmptyEmploymentInfo(),
  status: data.status || 'draft'
})
```

## Code Style

### Functional Programming

- **No mutations** - immutable data only
- **Pure functions** preferred
- **Composition** over inheritance
- **Array methods** over loops

```typescript
// Good - Pure function
const calculateScore = (app: Application): number => {
  const { financialInfo, employmentInfo } = app
  const debtRatio = financialInfo.monthlyDebt / employmentInfo.income
  return Math.max(300, Math.min(850, 700 - debtRatio * 100))
}

// Good - Composition
const processApplication = (app: Application): Application => {
  return pipe(
    validateApplication,
    calculateCreditScore,
    makeDecision
  )(app)
}
```

### No Comments Policy

Code must be self-documenting:

```typescript
// Avoid
const calc = (p: number, c: Customer): number => {
  // Check if premium customer
  if (c.tier === 'premium') {
    return p * 0.8 // 20% discount
  }
  return p * 0.9
}

// Good
const PREMIUM_DISCOUNT = 0.8
const STANDARD_DISCOUNT = 0.9

const getDiscountRate = (customer: Customer): number =>
  customer.tier === 'premium' ? PREMIUM_DISCOUNT : STANDARD_DISCOUNT

const applyDiscount = (price: number, customer: Customer): number =>
  price * getDiscountRate(customer)
```

### Options Objects Pattern

Default to options objects for clarity:

```typescript
// Avoid
const createPayment = (
  amount: number,
  currency: string,
  cardId: string,
  customerId: string
): Payment => { }

// Good
type PaymentOptions = {
  amount: number
  currency: string
  cardId: string
  customerId: string
}

const createPayment = (options: PaymentOptions): Payment => {
  const { amount, currency, cardId, customerId } = options
  // implementation
}

// Clear at call site
createPayment({ 
  amount: 100, 
  currency: 'USD',
  cardId: 'card_123',
  customerId: 'cust_456'
})
```

## Refactoring Guidelines

### When to Refactor

- After tests pass (green state)
- When you see knowledge duplication
- When names unclear
- When structure complex

### Refactoring Rules

1. **Commit before refactoring**

```bash
git commit -m "feat: add validation"
# Now safe to refactor
```

1. **DRY = Don't Repeat Knowledge** (not code)

```typescript
// NOT a DRY violation - different knowledge
const validateAge = (age: number): boolean => 
  age >= 18 && age <= 100

const validateRating = (rating: number): boolean => 
  rating >= 1 && rating <= 5

// IS a DRY violation - same knowledge repeated
const MINIMUM_CREDIT_SCORE = 620

const isHighRisk = (score: number): boolean => 
  score < MINIMUM_CREDIT_SCORE

const getDecision = (score: number): string =>
  score < MINIMUM_CREDIT_SCORE ? 'declined' : 'approved'
```

1. **Maintain APIs**

```typescript
// Original
export const processPayment = (payment: Payment): Result => {
  // 100 lines of code
}

// Refactored - same public API
export const processPayment = (payment: Payment): Result => {
  validatePayment(payment)
  const authorized = authorizePayment(payment)
  return capturePayment(authorized)
}

// New internal functions - not exported
const validatePayment = (payment: Payment): void => { }
const authorizePayment = (payment: Payment): AuthorizedPayment => { }
```

1. **Verify after refactoring**

```bash
npm test          # Must pass
npm run lint      # Must pass
npm run type-check # Must pass
git commit -m "refactor: extract payment helpers"
```

### Common Anti-patterns to Avoid

```typescript
// Avoid: Mutation
items.push(newItem)

// Good: Immutable
return [...items, newItem]

// Avoid: Nested conditionals
if (user) {
  if (user.isActive) {
    if (user.hasPermission) { }
  }
}

// Good: Early returns
if (!user?.isActive || !user.hasPermission) return

// Avoid: Large functions
const processOrder = (order) => {
  // 100+ lines
}

// Good: Composed functions
const processOrder = flow(
  validateOrder,
  calculatePricing,
  applyDiscounts,
  submitOrder
)
```

## Important Reminders

- Do what's asked; nothing more, nothing less
- NEVER create files unless absolutely necessary
- Prefer editing existing files
- No proactive documentation creation

## Success Criteria

The application must satisfy ALL scenarios in `features/*.feature`. Each scenario must pass before the feature is considered complete.

## Installing New Packages

When installing packages, check for ESLint plugins to ensure proper usage.

## Git Workflow

### Committing Changes

```bash
# Run in parallel
git status
git diff
git log --oneline -n 5

# Stage and commit with proper message
git add .
git commit -m "feat: add credit validation

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Creating Pull Requests

```bash
# Check branch status
git status
git log main..HEAD --oneline

# Push and create PR
git push -u origin feature-branch
gh pr create --title "feat: add validation" --body "## Summary
- Added validation
- Updated tests

🤖 Generated with Claude Code"
```

Remember: NEVER update git config, use TodoWrite/Task tools, or push unless explicitly asked.

## Markdown

**CRITICAL**: All markdown must meet standards and pass the markdownlint linter, which is available via `npm run lint:mega`.
