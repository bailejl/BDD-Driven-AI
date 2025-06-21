# Gherkin Implementation Gaps Analysis

This document identifies gaps between the Gherkin feature files and the actual implementation of the First Bank of Change credit application system.

**Last Updated**: After refactoring to separate citizenship from employment (June 2025)

## Feature Files Analyzed

1. `features/credit-application-personal.feature`
2. `features/credit-application.feature`
3. `features/homepage.feature`

## Implementation Findings

### 1. URL Navigation and Form Sections ✅ RESOLVED

**Previous Gap**: The Gherkin step `they navigate the "personal information" section of the form` did not clearly indicate the actual URL structure.

**Current Implementation** (After Refactoring):
- Personal Information URL: `/user/form` (Personal fields: First Name, Middle Initial, Last Name, DOB, SSN)
- Citizenship Information URL: `/user/form/citizenship` (Citizenship fields: Country of Citizenship, Second Country)
- Employment Information URL: `/user/form/employment` (Employment fields: Employer, Phone, Years/Months Employed, Occupation)
- Financial Information URL: `/user/form/financial` (Financial fields: Income, Housing, Checking, Savings, Investments)

**Status**: ✅ **RESOLVED** - URLs are now descriptive and match logical form sections. Each page has proper heading titles.

### 2. Form Section Naming Discrepancy ✅ RESOLVED

**Previous Gap**: The form sections in the code vs. what appears in the UI were inconsistent.

**Current Code Mapping** (Updated in `credit-application.playwright.steps.ts`):
```typescript
const sectionNameMap = {
  "personal information": FormSections.Personal,
  "citizenship information": FormSections.Citizenship,
  "employment information": FormSections.Employment,
  "financial information": FormSections.Financial,
};
```

**Current Implementation Reality**:
- Page 1 (`/user/form`): "Personal Information" heading - Personal fields only
- Page 2 (`/user/form/citizenship`): "Citizenship Information" heading - Citizenship fields only
- Page 3 (`/user/form/employment`): "Employment Information" heading - Employment fields only  
- Page 4 (`/user/form/financial`): "Financial Information" heading - Financial fields only

**Status**: ✅ **RESOLVED** - UI headings now accurately match the content and logical grouping of fields.

### 3. Spelling Errors in Test Data

**Gap**: Multiple spelling errors in the test data that don't match proper English.

**Examples from `features/data/data.json`**:
- "personal" instead of "personal"
- "initial" instead of "initial"
- "application" instead of "application" (seen in UI)
- "demonstration" instead of "demonstration" (seen in homepage)
- "simple" instead of "simple" (seen in homepage)

### 4. Error Message References

**Gap**: The Gherkin refers to error message groups by names that contain spelling errors.

**Feature File Reference**:
```gherkin
Then they see '<error message names>' name error messages
```

**Data File Names**:
- "required personal error msgs"
- "personal at least X characters"
- "middle initial must be X characters"

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

**Example**: The concept of "attempting" to continue (`they attempt to continue to next section`) has a typo and the distinction between "attempt" vs actually continuing is not clear.

### 8. Test Data Structure

**Gap**: The relationship between personas, aliases, and data modifications is not immediately clear from the Gherkin.

**Implementation**:
- Personas have names and aliases
- Data fragments (like "failing back-end ratio") can modify personas
- The Gherkin uses both approaches but doesn't explain when to use which

### 9. New Gap: Missing Citizenship Section in Feature Files

**Gap**: The Gherkin feature files don't reference the new citizenship information section that now exists.

**Current Feature Files**:
- `credit-application-personal.feature` only mentions "personal information" section
- No feature files test citizenship information specifically
- Step definition maps include "citizenship information" but no Gherkin scenarios use it

**Implementation Reality**:
- Citizenship page exists at `/user/form/citizenship` with two fields
- Page is mandatory in the flow: Personal → Citizenship → Employment → Financial
- No test scenarios cover citizenship-specific validation or navigation

**Recommendation**: Add Gherkin scenarios to test citizenship section navigation and validation.

### 10. New Gap: Inconsistent Step Definition Behavior

**Gap**: Some step definitions may not handle the new 4-page flow correctly.

**Potential Issues**:
- `"fills out the form with their information"` step may need updates for new citizenship page
- Navigation steps might need to account for the additional page in the flow
- Test data needs to include citizenship information for complete form submission

**Implementation Impact**:
- E2E tests currently pass, but some edge cases around citizenship navigation may not be covered
- Step definitions successfully handle the new flow, but documentation should be updated

## Recommendations

### Completed (Post-Refactoring)
1. ✅ **Clarify Section Names**: UI section headings now match the logical grouping of fields
2. ✅ **URL Documentation**: URL structure now uses descriptive paths
3. ✅ **Document Navigation Paths**: Form flow is now clearly defined as Personal → Citizenship → Employment → Financial

### Still Needed
4. **Fix Spelling Errors**: Correct all spelling errors in test data, UI text, and feature files
   - "personal", "initial", "application", "demonstration", "simple", "attempt"
   - Error message names in test data
   - UI text containing spelling errors

5. **Add Citizenship Test Scenarios**: Create Gherkin scenarios to test the new citizenship section
   - Navigation to citizenship page
   - Citizenship field validation
   - Integration with overall form flow

6. **Update Feature File Documentation**: Ensure feature files reflect the current 4-page structure
   - Add citizenship information scenarios
   - Update step definitions documentation
   - Clarify persona data requirements for citizenship fields

7. **Standardize Error Message Names**: Use consistent, correctly-spelled names for error message groups

8. **Verify Step Definition Completeness**: Ensure all step definitions handle the new 4-page flow correctly
   - Test edge cases around citizenship navigation
   - Verify data persistence across all pages
   - Update any hardcoded page references

## Current Status Summary

**Resolved Issues**:
- ✅ URL structure now descriptive and logical
- ✅ Form section headings match content
- ✅ Page navigation flow is coherent
- ✅ Step definitions updated for new structure

**Remaining Issues**:
- Spelling errors throughout system
- Missing citizenship-specific test scenarios  
- Need documentation updates for new flow
- Step definition completeness verification needed