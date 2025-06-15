import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from './app';

// Mock the auth service
jest.mock('@services', () => ({
  useAuth: () => ({
    user: null,
    signin: jest.fn(),
    signout: jest.fn()
  }),
  useProvideAuth: () => ({
    user: null,
    signin: jest.fn(),
    signout: jest.fn()
  }),
  useFormData: () => ({
    data: {},
    updateData: jest.fn()
  }),
  useProviderFormData: () => ({
    data: {},
    updateData: jest.fn()
  }),
  useProviderDB: () => ({
    applications: [],
    addUpdateApplciation: jest.fn(),
    getApplication: jest.fn()
  }),
  formDataContext: {
    Provider: ({ children }: any) => children,
    Consumer: ({ children }: any) => children({})
  },
  dbContext: {
    Provider: ({ children }: any) => children,
    Consumer: ({ children }: any) => children({})
  },
  authContext: {
    Provider: ({ children }: any) => children,
    Consumer: ({ children }: any) => children({})
  }
}));

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(<App />);
    expect(getByText('Welcome to the Declarative Gherkin Demo!')).toBeTruthy();
  });
});
