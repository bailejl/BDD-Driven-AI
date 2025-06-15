import '@testing-library/jest-dom'

// Global test setup
global.console = {
  ...global.console,
  // Uncomment to ignore warnings in tests
  // warn: jest.fn(),
}