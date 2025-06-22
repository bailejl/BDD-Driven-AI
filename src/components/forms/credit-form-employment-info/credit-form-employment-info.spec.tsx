import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import CreditFormEmploymentInfo from './credit-form-employment-info'
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
      countryOfCitizenShip: 'US',
      countryOfCitizenShipSecondary: 'CA',
      currentEmployerName: 'Test Company',
      workPhone: '(555)123-4567',
      yearsEmployed: 5,
      monthsEmployed: 6,
      occupation: 'Engineer',
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

describe('CreditFormEmploymentInfo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <FormWizardContext>
          <CreditFormEmploymentInfo />
        </FormWizardContext>
      </MemoryRouter>
    )
    expect(baseElement).toBeTruthy()
  })
})
