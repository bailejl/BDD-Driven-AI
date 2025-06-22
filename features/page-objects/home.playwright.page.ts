import { Page } from '@playwright/test'

import PlaywrightPage from './playwright-page'

/**
 * Page object for the home page
 */
export default class HomePage extends PlaywrightPage {
  constructor(page: Page) {
    super(page)
  }

  /**
   * Selectors for home page elements
   */
  private readonly selectors = {
    title: '#title',
    applicationTitle: '#application-title',
    runGherkinTestTitle: '#run-Gherkin-tests-title',
    usingAppTitle: '#using-app-title',
  }

  /**
   * Get page title text
   */
  async getTitleText(): Promise<string> {
    return await this.getText(this.selectors.title)
  }

  /**
   * Get application title text
   */
  async getApplicationTitleText(): Promise<string> {
    return await this.getText(this.selectors.applicationTitle)
  }

  /**
   * Get run Gherkin test title text
   */
  async getRunGherkinTestTitleText(): Promise<string> {
    return await this.getText(this.selectors.runGherkinTestTitle)
  }

  /**
   * Get using app title text
   */
  async getUsingAppTitleText(): Promise<string> {
    return await this.getText(this.selectors.usingAppTitle)
  }

  /**
   * Check if demo instructions are visible
   */
  async areDemoInstructionsVisible(): Promise<boolean> {
    return await this.isVisible(this.selectors.applicationTitle)
  }

  /**
   * Navigate to home page
   */
  async open() {
    await super.open('')
  }
}
