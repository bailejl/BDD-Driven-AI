import { defineConfig, devices } from '@playwright/test'
import { defineBddConfig } from 'playwright-bdd'

const testDir = defineBddConfig({
  features: ['features/**/*.feature'],
  steps: [
    'features/step-definitions/**/*.playwright.steps.ts',
    'features/fixtures/test.ts',
  ],
})

export default defineConfig({
  testDir,

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,

  /* Use parallel workers for faster CI runs */
  workers: process.env.CI ? 2 : undefined,

  /* Timeout configuration for faster CI runs */
  timeout: process.env.CI ? 10000 : 30000, // 10s in CI, 30s locally
  expect: {
    timeout: process.env.CI ? 5000 : 10000, // 5s in CI, 10s locally
  },

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI
    ? [['json', { outputFile: '.tmp/playwright-report.json' }]] // Only JSON in CI
    : [['html'], ['json', { outputFile: '.tmp/playwright-report.json' }]],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:4200',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: process.env.CI ? 'retain-on-failure' : 'on-first-retry',

    /* Take screenshot on failure */
    screenshot: 'only-on-failure',

    /* Record video on failure - disabled in CI for performance */
    video: process.env.CI ? 'off' : 'retain-on-failure',

    /* Disable animations for faster CI runs */
    ...(process.env.CI && {
      actionTimeout: 5000,
      navigationTimeout: 10000,
    }),
  },

  /* Configure projects for major browsers */
  projects: process.env.CI
    ? [
        // Run only Chromium in CI for faster smoke tests
        {
          name: 'chromium',
          use: {
            ...devices['Desktop Chrome'],
            viewport: { width: 1280, height: 720 },
          },
        },
      ]
    : [
        {
          name: 'chromium',
          use: {
            ...devices['Desktop Chrome'],
            viewport: { width: 1280, height: 720 },
          },
        },

        {
          name: 'firefox',
          use: {
            ...devices['Desktop Firefox'],
            viewport: { width: 1280, height: 720 },
          },
        },

        {
          name: 'webkit',
          use: {
            ...devices['Desktop Safari'],
            viewport: { width: 1280, height: 720 },
          },
        },
      ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run dev',
  //   port: 4200,
  //   reuseExistingServer: !process.env.CI,
  // },
})
