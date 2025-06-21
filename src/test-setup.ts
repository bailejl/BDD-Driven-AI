import '@testing-library/jest-dom'

// Polyfill for TextEncoder/TextDecoder needed by React Router v7
import { TextDecoder, TextEncoder } from 'util'
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as typeof global.TextDecoder

// Global test setup
global.console = {
  ...global.console,
  // Uncomment to ignore warnings in tests
  // warn: jest.fn(),
}
