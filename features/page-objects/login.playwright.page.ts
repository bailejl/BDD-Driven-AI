import { Page } from '@playwright/test'

import HeaderPage from './header.playwright.page'
import PlaywrightPage from './playwright-page'

/**
 * Page object for the login page
 */
export default class LoginPage extends PlaywrightPage {
  private readonly header: HeaderPage

  constructor (page: Page) {
    super(page)
    this.header = new HeaderPage(page)
  }

  /**
   * Selectors for login page elements
   */
  private readonly selectors = {
    inputUsername: '#username',
    inputPassword: '#password',
    btnSubmit: 'button[type="submit"]'
  }

  /**
   * Perform login with username and password
   */
  async login (username: string, password: string) {
    // Check if already logged in and sign out if needed
    if (await this.header.isSignOutButtonVisible()) {
      await this.header.clickSignOut()
    }

    // Click sign in button
    await this.header.clickSignIn()

    // Fill login form
    await this.fill(this.selectors.inputUsername, username)
    await this.fill(this.selectors.inputPassword, password)
    await this.click(this.selectors.btnSubmit)
  }

  /**
   * Navigate to login page
   */
  async open () {
    await super.open('login')
  }
}
