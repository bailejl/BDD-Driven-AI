import { Typography } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import CreditFormCitizenshipInfo from '../credit-form-citizenship-info/credit-form-citizenship-info'
import CreditFormComplete from '../credit-form-complete/credit-form-complete'
import CreditFormEmploymentInfo from '../credit-form-employment-info/credit-form-employment-info'
import CreditFormFinancialInfo from '../credit-form-financial-info/credit-form-financial-info'
import CreditFormPersonalInfo from '../credit-form-personal-info/credit-form-personal-info'
import './credit-form-intro.module.scss'

/* eslint-disable-next-line */
export interface CreditFormIntroProps {}

// This routes to different pages within the new credit card application form.
export const CreditFormIntro = () => (
  // React Router v7 uses relative paths automatically in nested routes

  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '0 0 0 40px',
    }}
  >
    <Typography style={{ display: 'flex' }} variant="h4">
      New Credit Card Application
    </Typography>
    <Routes>
      <Route index element={<CreditFormPersonalInfo />} />
      <Route path="citizenship" element={<CreditFormCitizenshipInfo />} />
      <Route path="employment" element={<CreditFormEmploymentInfo />} />
      <Route path="financial" element={<CreditFormFinancialInfo />} />
      <Route path="complete" element={<CreditFormComplete />} />
    </Routes>
  </div>
)

export default CreditFormIntro
