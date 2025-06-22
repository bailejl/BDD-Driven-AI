import React from 'react'
import { render } from '@testing-library/react'

import FormWizardContext from './form-wizard-context'

describe('FormWizardContext', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <FormWizardContext>
        <div>Test</div>
      </FormWizardContext>
    )
    expect(baseElement).toBeTruthy()
  })
})
