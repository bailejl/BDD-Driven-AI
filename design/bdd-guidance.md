# BDD Guidance

This document is to help people and I understand the context related to Concise Decelarative Gherkin.
By providing this context, the acceptance criteria can be smaller and easier to understand. AI can
then implement code based on the BDD and related artifacts.

## Implementation Findings

### 1. URL Navigation and Form Sections

**Gap**: The Gherkin step `they navigate the "personal information" section of the form` does not clearly indicate the actual URL structure.

**Implementation Details**:

- Personal Information URL: `/user/form` (page 1)
- Employment/Citizenship Information URL: `/user/form/page2` (still labeled "Personal Information" in UI)
- Financial Information URL: `/user/form/page3`

**Issue**: The UI labels page 2 as "Personal Information" but it contains citizenship and employment fields, which creates confusion between the Gherkin descriptions and actual implementation.

### 2. Form Section Naming Discrepancy

**Gap**: The form sections in the code vs. what appears in the UI are inconsistent.

**Code Mapping** (from `credit-application.playwright.steps.ts`):

```typescript
const sectionNameMap = {
  "personal information": FormSections.Personal,
  "employment information": FormSections.Employment,
  "financial information": FormSections.Financial,
};
```

**Implementation Reality**:

- Page 1 (`/user/form`): Personal Information (First Name, Middle Initial, Last Name, DOB, SSN)
- Page 2 (`/user/form/page2`): Still shows "Personal Information" heading but contains:
  - Country of Citizenship
  - Second Country of Citizenship
  - Employer Name
  - Work Phone
  - Years/Months Employed
  - Occupation

### 3. Spelling Errors in Test Data

**Gap**: Multiple spelling errors in the test data that don't match proper English.

**Examples from `features/data/data.json`**:

- "perosnal" instead of "personal"
- "intial" instead of "initial"
- "applciation" instead of "application" (seen in UI)
- "demostraion" instead of "demonstration" (seen in homepage)
- "simpale" instead of "simple" (seen in homepage)

### 4. Error Message References

**Gap**: The Gherkin refers to error message groups by names that contain spelling errors.

**Feature File Reference**:

```gherkin
Then they see '<error message names>' name error messages
```

**Data File Names**:

- "required perosnal error msgs"
- "perosnal at least X characters"
- "middle intial must be X characters"

### 5. Login Flow Navigation

**Gap**: The Gherkin doesn't specify the navigation path from login to the credit application form.

**Actual Navigation Path**:

1. Homepage (`/`) → Sign In button
2. Login page (`/login`)
3. After login → redirects to homepage (`/`)
4. Must click "Go to User Homepage" → User page (`/user`)
5. Must click "Apply" → Credit form (`/user/form`)

### 6. Form Field Validation Timing

**Gap**: The Gherkin step `they attempt to continue to next section` doesn't indicate when validation occurs.

**Implementation Detail**:

- Validation appears to happen on form submission (clicking Continue)
- Error messages are displayed inline below each field

### 7. Missing Step Definitions

**Gap**: Some concepts in the feature files may not have corresponding implementations.

**Example**: The concept of "attempting" to continue (`they attept to continue to next section`) has a typo and the distinction between "attempt" vs actually continuing is not clear.

### 8. Test Data Structure

**Gap**: The relationship between personas, aliases, and data modifications is not immediately clear from the Gherkin.

**Implementation**:

- Personas have names and aliases
- Data fragments (like "failing back-end ratio") can modify personas
- The Gherkin uses both approaches but doesn't explain when to use which

## Recommendations

1. **Fix Spelling Errors**: Correct all spelling errors in test data, UI text, and feature files
2. **Clarify Section Names**: Make the UI section headings match the logical grouping of fields
3. **Document Navigation Paths**: Add comments or documentation explaining the full navigation flow
4. **Standardize Error Message Names**: Use consistent, correctly-spelled names for error message groups
5. **URL Documentation**: Document the URL structure for each form section
6. **Fix Step Definition Typos**: Correct "attept" to "attempt" in the Gherkin step
