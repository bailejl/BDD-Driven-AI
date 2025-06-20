import { Page } from "@playwright/test";
import PlaywrightPage from "./playwright-page";

// The sections of the credit form mapped to URL paths
export enum FormSections {
  Personal = "user/form",
  Employment = "user/form/page2",
  Financial = "user/form/page3",
}

/**
 * Page object for the credit application form
 */
export default class CreditFormPage extends PlaywrightPage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Selectors for form elements
   */
  private selectors = {
    // Helper texts
    pageHelperTexts: ".Mui-error",

    // Personal section elements
    tfFirstName: '[name="firstName"]',
    txtFirstNameHelperText: "#first-name-helper-text",
    tfMiddleInitial: '[name="middleInitial"]',
    txtMiddleInitialHelperText: "#middle-initial-helper-text",
    tfLastName: '[name="lastName"]',
    txtLastNameHelperText: "#last-name-helper-text",
    tfDateOfBirth: '[name="dateOfBirth"]',
    txtDateOfBirthHelperText: "#date-of-birth-helper-text",
    tfSsn: '[name="ssn"]',
    txtSsnHelperText: "#ssn-helper-text",

    // Employment section elements
    slctCountryOfCitizenShip: '[name="countryOfCitizenShip"]',
    slctCountryOfCitizenShipSecondary: '[name="countryOfCitizenShipSecondary"]',
    tfCurrentEmployerName: '[name="currentEmployerName"]',
    tfWorkPhone: '[name="workPhone"]',
    tfYearsEmployed: '[name="yearsEmployed"]',
    tfMonthsEmployed: '[name="monthsEmployed"]',
    tfOccupation: '[name="occupation"]',

    // Financial section elements
    tfMonthlyIncome: '[name="monthlyIncome"]',
    tfMonthlyHousingPayment: '[name="monthlyHousingPayment"]',
    tfCheckingAmount: '[name="checkingAmount"]',
    tfSavingsAmount: '[name="savingsAmount"]',
    tfInvestmentsAmount: '[name="investmentsAmount"]',

    // Completion Page
    txtResponseMsg: "#response-msg",
    txtResponseTitle: "#response-title",

    // Buttons
    btnContinue: 'button[type="submit"]',
    btnSubmit: 'button[type="submit"]',
  };

  /**
   * Navigate to credit form
   */
  async open() {
    await super.open("user/form");
  }

  /**
   * Navigate to specific form section
   */
  async goToSection(section: FormSections) {
    await super.open(section);
  }

  /**
   * Submit the form
   */
  async submitForm() {
    await this.click(this.selectors.btnSubmit);
  }

  /**
   * Fill out complete form with user data
   */
  async filloutForm(data: any) {
    await this.filloutPersonalSection(data);
    
    // Wait a moment for validation to complete
    await this.page.waitForTimeout(500);
    
    await this.click(this.selectors.btnContinue);
    
    // Wait for navigation to employment section
    await this.page.waitForURL('**/user/form/page2', { timeout: 15000 });
    
    await this.filloutEmploymentSection(data);
    await this.click(this.selectors.btnContinue);
    
    // Wait for navigation to financial section
    await this.page.waitForURL('**/user/form/page3', { timeout: 15000 });
    
    await this.filloutFinancialSection(data);
  }

  /**
   * Wait for form to be valid (no error messages)
   */
  private async waitForFormToBeValid() {
    try {
      // Wait for any validation errors to clear
      await this.page.waitForFunction(
        () => {
          const errors = document.querySelectorAll('.Mui-error');
          return errors.length === 0;
        },
        { timeout: 5000 }
      );
    } catch (e) {
      // If validation doesn't clear in time, continue anyway
      console.log('Form validation did not clear in time, continuing...');
    }
  }

  /**
   * Wait for navigation with retry logic
   */
  private async waitForSectionNavigation(urlPattern: string) {
    const maxRetries = 3;
    for (let i = 0; i < maxRetries; i++) {
      try {
        await this.page.waitForURL(urlPattern, { timeout: 5000 });
        return; // Success, exit
      } catch (error) {
        if (i === maxRetries - 1) {
          // Last retry failed, throw the error
          throw error;
        }
        // Wait a bit before retrying
        await this.page.waitForTimeout(1000);
      }
    }
  }

  /**
   * Fill out personal information section
   */
  async filloutPersonalSection(data: any) {
    // Wait for form to be ready
    await this.page.waitForSelector(this.selectors.tfFirstName, { state: 'visible' });
    
    // Helper function to robustly fill a field with React form compatibility
    const fillField = async (selector: string, value: string) => {
      const element = this.page.locator(selector);
      await element.waitFor({ state: 'visible' });
      
      // Force clear and fill multiple times if needed
      for (let attempt = 0; attempt < 3; attempt++) {
        await element.click();
        await element.press('Control+a'); // Select all
        await element.press('Delete'); // Clear
        await element.type(value, { delay: 10 }); // Type with small delay
        
        // Verify the value was set correctly
        const currentValue = await element.inputValue();
        if (currentValue === value) {
          break; // Success
        }
        
        // Wait before retrying
        await this.page.waitForTimeout(100);
      }
      
      await element.blur(); // Trigger validation
    };
    
    // Fill all fields with proper values
    await fillField(this.selectors.tfFirstName, data["firstName"] || "");
    await fillField(this.selectors.tfMiddleInitial, data["middleInitial"] || "");
    await fillField(this.selectors.tfLastName, data["lastName"] || "");
    
    // Handle the DatePicker specially
    const dateInput = this.page.locator('#date-of-birth');
    await dateInput.waitFor({ state: 'visible' });
    await dateInput.click();
    await dateInput.press('Control+a');
    await dateInput.press('Delete');
    await dateInput.type(data["dateOfBirth"] || "", { delay: 10 });
    await dateInput.blur();
    
    // Fill SSN
    await fillField(this.selectors.tfSsn, data["ssn"] || "");
    
    // Wait for any validation to complete
    await this.page.waitForTimeout(1000);
  }

  /**
   * Fill out employment information section
   */
  async filloutEmploymentSection(data: any) {
    // Handle MUI native select - need to find the actual select element
    const countrySelect = this.page.locator('select[name="countryOfCitizenShip"]');
    await countrySelect.selectOption(data["countryOfCitizenShip"] || "");
    
    const secondaryCountrySelect = this.page.locator('select[name="countryOfCitizenShipSecondary"]');
    await secondaryCountrySelect.selectOption(data["countryOfCitizenShipSecondary"] || "");

    await this.fill(
      this.selectors.tfCurrentEmployerName,
      data["currentEmployerName"] || ""
    );
    await this.fill(this.selectors.tfWorkPhone, data["workPhone"] || "");
    await this.fill(
      this.selectors.tfYearsEmployed,
      String(data["yearsEmployed"] || "")
    );
    await this.fill(
      this.selectors.tfMonthsEmployed,
      String(data["monthsEmployed"] || "")
    );
    await this.fill(this.selectors.tfOccupation, data["occupation"] || "");
  }

  /**
   * Fill out financial information section
   */
  async filloutFinancialSection(data: any) {
    await this.fill(
      this.selectors.tfMonthlyIncome,
      String(data["monthlyIncome"] || "")
    );
    await this.fill(
      this.selectors.tfMonthlyHousingPayment,
      String(data["monthlyHousingPayment"] || "")
    );
    await this.fill(
      this.selectors.tfCheckingAmount,
      String(data["checkingAmount"] || "")
    );
    await this.fill(
      this.selectors.tfSavingsAmount,
      String(data["savingsAmount"] || "")
    );
    await this.fill(
      this.selectors.tfInvestmentsAmount,
      String(data["investmentsAmount"] || "")
    );
  }

  /**
   * Get response message text
   */
  async getResponseMessage(): Promise<string> {
    return await this.getText(this.selectors.txtResponseMsg);
  }

  /**
   * Get response title text
   */
  async getResponseTitle(): Promise<string> {
    return await this.getText(this.selectors.txtResponseTitle);
  }

  /**
   * Check if there are any form errors
   */
  async hasErrors(): Promise<boolean> {
    return await this.isVisible(this.selectors.pageHelperTexts);
  }
}
