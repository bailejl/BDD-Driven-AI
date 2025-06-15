import '@testing-library/jest-dom'

// Polyfill for TextEncoder/TextDecoder needed by React Router v7
import { TextEncoder, TextDecoder } from 'util'
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as any

// Global test setup
global.console = {
  ...global.console,
  // Uncomment to ignore warnings in tests
  // warn: jest.fn(),
}