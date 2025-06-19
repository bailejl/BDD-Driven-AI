import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CreditFormPersonalInfo from './credit-form-personal-info';
import FormWizardContext from '../form-wizard-context/form-wizard-context';

// Mock react-hook-form
jest.mock('react-hook-form', () => ({
  useForm: () => ({
    register: jest.fn(() => ({ name: 'test' })),
    handleSubmit: jest.fn((fn) => fn),
    setValue: jest.fn(),
    errors: {}
  }),
  Controller: ({ children }: { children: React.ReactNode }) => children
}));

// Mock the form data service
jest.mock('@services', () => ({
  useFormData: () => ({
    data: {
      firstName: 'John',
      middleInitial: 'A',
      lastName: 'Doe',
      dateOfBirth: '01/01/1990',
      ssn: '123-45-6789'
    },
    appendFormData: jest.fn()
  }),
  useProviderFormData: () => ({
    data: {},
    appendFormData: jest.fn()
  }),
  formDataContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
    Consumer: ({ children }: { children: (value: unknown) => React.ReactNode }) => children({})
  },
  createApplicationData: () => ({})
}));

describe('CreditFormPersonalInfo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <FormWizardContext>
          <CreditFormPersonalInfo />
        </FormWizardContext>
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
