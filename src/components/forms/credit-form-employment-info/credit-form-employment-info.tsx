import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { createApplicationData, useFormData } from '@services'

import './credit-form-employment-info.module.scss'

/* eslint-disable-next-line */
export interface CreditFormEmploymentInfoProps {}

// User inputs for this section of the new credit card applciation form.
type EmploymentInputs = {
  currentEmployerName: string
  workPhone: string
  yearsEmployed: number
  monthsEmployed: number
  occupation: string
}

// Data validation functions for the data in this section of the form.
const schema = yup.object().shape({
  currentEmployerName: yup
    .string()
    .required()
    .min(3)
    .matches(/^[A-Za-z .]+$/i),
  workPhone: yup
    .string()
    .required()
    .min(3)
    .matches(/^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/i),
  yearsEmployed: yup.number().required().max(80).positive(),
  monthsEmployed: yup.number().required().max(12).positive(),
  occupation: yup
    .string()
    .required()
    .min(3)
    .matches(/^[A-Za-z .]+$/i),
})

// This creates the employment section of the new creadit card application form
export const CreditFormEmploymentInfo = () => {
  const { register, handleSubmit, formState } = useForm<EmploymentInputs>({
    resolver: yupResolver(schema),
  })
  const { errors = {} } = formState || {}
  const formData = useFormData()
  const navigate = useNavigate()

  const cachedData = formData?.data || createApplicationData()

  // Submit this stage of the form and go to the next page
  const onSubmit = (data: EmploymentInputs) => {
    formData?.appendFormData(data)
    navigate('/user/form/financial')
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h5">Employment Information</Typography>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <TextField
          {...register('currentEmployerName')}
          required
          id="standard-required"
          label="Employer Name"
          style={{ display: 'flex', margin: '0 0 25px 0' }}
          error={errors.currentEmployerName?.message !== undefined}
          helperText={errors.currentEmployerName?.message}
          defaultValue={cachedData.currentEmployerName}
        />
        <TextField
          {...register('workPhone')}
          required
          id="standard-required"
          label="Work Phone"
          style={{ display: 'flex', margin: '0 0 25px 0' }}
          error={errors.workPhone?.message !== undefined}
          helperText={errors.workPhone?.message}
          defaultValue={cachedData.workPhone}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          <TextField
            {...register('yearsEmployed')}
            required
            id="standard-required"
            label="Years Employed"
            style={{ display: 'flex', margin: '0 0 25px 0' }}
            error={errors.yearsEmployed?.message !== undefined}
            helperText={errors.yearsEmployed?.message}
            defaultValue={cachedData.yearsEmployed}
          />
          <TextField
            {...register('monthsEmployed')}
            required
            id="standard-required"
            label="Months Employed"
            style={{ display: 'flex', margin: '0 0 25px 0' }}
            error={errors.monthsEmployed?.message !== undefined}
            helperText={errors.monthsEmployed?.message}
            defaultValue={cachedData.monthsEmployed}
          />
        </div>
        <TextField
          {...register('occupation')}
          required
          id="standard-required"
          label="Occupation"
          style={{ display: 'flex', margin: '0 0 25px 0' }}
          error={errors.occupation?.message !== undefined}
          helperText={errors.occupation?.message}
          defaultValue={cachedData.occupation}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}
        >
          <Button variant="contained">Cancel</Button>
          <Button variant="contained" color="secondary">
            Previous
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Continue
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreditFormEmploymentInfo
