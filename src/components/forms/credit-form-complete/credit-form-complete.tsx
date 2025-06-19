import { Typography } from '@mui/material'
import React from 'react'

import { useDB, useFormData } from '@services'

import './credit-form-complete.module.scss'

/* eslint-disable-next-line */
export interface CreditFormCompleteProps {}

// This form show up after the user submits their new credit card application.
// It runs validations on the data provided and let's them know if
// their application will go to the next round of processing or not.
export const CreditFormComplete = () => {
  const formData = useFormData()
  const db = useDB()

  const validForm = formData?.isValid() || false
  const { approvedForm, hasErrored } = (() => {
    try {
      return {
        approvedForm: formData?.isApproved(),
        hasErrored: false,
      }
    } catch {
      // Expected error for certain users (e.g., Kelly Baddy)
      return {
        approvedForm: undefined,
        hasErrored: true,
      }
    }
  })()

  const { title, msg } = (() => {
    if (validForm && approvedForm) {
      if (formData?.data) {
        db?.addUpdateApplciation(formData.data)
      }
      return {
        title: 'Sucess!',
        msg: 'Thank you, your application was submitted for further processing.',
      }
    } else if (hasErrored) {
      return {
        title: 'System unavailable',
        msg: 'Sorry, our systems are unavailable at this time. We will email your credit card status later.',
      }
    } else {
      return {
        title: 'Sorry to inform you...',
        msg: 'Your application cannot proceed. We will mail you a detailed letter.',
      }
    }
  })()

  return (
    <div>
      <Typography id="response-title" variant="h5">
        {title}
      </Typography>
      <Typography id="response-msg" variant="body1">
        {msg}
      </Typography>
    </div>
  )
}

export default CreditFormComplete
