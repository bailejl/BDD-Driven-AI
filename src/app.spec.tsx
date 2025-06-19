import React from 'react'
import { render, screen } from '@testing-library/react'

import App from './app'

// Mock the auth service
jest.mock('@services', () => ({
  useAuth: () => ({
    user: null,
    signin: jest.fn(),
    signout: jest.fn(),
  }),
  useProvideAuth: () => ({
    user: null,
    signin: jest.fn(),
    signout: jest.fn(),
  }),
  useFormData: () => ({
    data: {},
    updateData: jest.fn(),
  }),
  useProviderFormData: () => ({
    data: {},
    updateData: jest.fn(),
  }),
  useProviderDB: () => ({
    applications: [],
    addUpdateApplciation: jest.fn(),
    getApplication: jest.fn(),
  }),
  formDataContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
    Consumer: ({
      children,
    }: {
      children: (value: unknown) => React.ReactNode
    }) => children({}),
  },
  dbContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
    Consumer: ({
      children,
    }: {
      children: (value: unknown) => React.ReactNode
    }) => children({}),
  },
  authContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
    Consumer: ({
      children,
    }: {
      children: (value: unknown) => React.ReactNode
    }) => children({}),
  },
}))

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />)
    expect(baseElement).toBeTruthy()
  })

  it('should have a greeting as the title', () => {
    render(<App />)
    expect(
      screen.getByText('Welcome to the Declarative Gherkin Demo!')
    ).toBeTruthy()
  })
})
