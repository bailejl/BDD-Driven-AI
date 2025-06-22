import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import CreditFormFinancialInfo from './credit-form-financial-info'
import FormWizardContext from '../form-wizard-context/form-wizard-context'

// Mock react-hook-form
jest.mock('react-hook-form', () => ({
  useForm: () => ({
    register: jest.fn(() => ({ name: 'test' })),
    handleSubmit: jest.fn((fn) => fn),
    setValue: jest.fn(),
    errors: {},
  }),
  Controller: ({ children }: { children: React.ReactNode }) => children,
}))

// Mock the form data service
jest.mock('@services', () => ({
  useFormData: () => ({
    data: {
      monthlyIncome: 5000,
      monthlyHousingPayment: 1500,
      checkingAmount: 10000,
      savingsAmount: 20000,
      investmentsAmount: 50000,
    },
    appendFormData: jest.fn(),
  }),
  useProviderFormData: () => ({
    data: {},
    appendFormData: jest.fn(),
  }),
  formDataContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
    Consumer: ({
      children,
    }: {
      children: (value: unknown) => React.ReactNode
    }) => children({}),
  },
  createApplicationData: () => ({}),
}))

describe('CreditFormFinancialInfo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <FormWizardContext>
          <CreditFormFinancialInfo />
        </FormWizardContext>
      </MemoryRouter>
    )
    expect(baseElement).toBeTruthy()
  })
})
