import { useFormData } from '@services';
import { Button, MenuItem, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useNavigate,
} from "react-router-dom";

import './credit-form-financial-info.module.scss';

// Financial inputs for the form
type FinancialInputs = {
  monthlyIncome: number,
  monthlyHousingPayment: number,
  checkingAmount: number,
  savingsAmount: number,
  investmentsAmount: number,
}

// Validation for the inputs
const schema = yup.object().shape({
  monthlyIncome: yup.number().required(),
  monthlyHousingPayment: yup.number().required(),
  checkingAmount: yup.number().required(),
  savingsAmount: yup.number().required(),
  investmentsAmount: yup.number().required(),
});

/* eslint-disable-next-line */
export interface CreditFormFinancialInfoProps { }

// Generates the financial info part of the new credit card application form
export function CreditFormFinancialInfo(props: CreditFormFinancialInfoProps) {
  const { register, handleSubmit, formState } = useForm<FinancialInputs>({
    resolver: yupResolver(schema),
  });
  const { errors = {} } = formState || {};
  const formData = useFormData();
  const navigate = useNavigate();

  const cachedData = formData.data;

  // This is the end of the form, so the submit button
  // TODO need to figure our the best way to do inversion of control, so a 
  // section is not aware of the form controls
  const onSubmit = (data: FinancialInputs) => {
    console.log("onSubmit")
    console.dir(data);
    formData.appendFormData(data);
    navigate("/user/form/complete");
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <Typography variant="h5">
        Financial Information
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <TextField 
          {...register("monthlyIncome")}
          required 
          id="standard-required" 
          label="Monthly Income"
          style={{ display: 'flex', margin: '10px 0 25px 0' }}
          error={errors.monthlyIncome?.message !== undefined}
          helperText={errors.monthlyIncome?.message}
          defaultValue={cachedData.monthlyIncome}
        />
        <TextField 
          {...register("monthlyHousingPayment")}
          required 
          id="standard-required" 
          label="Monthly Housing Cost"
          style={{ display: 'flex', margin: '0 0 25px 0' }}
          error={errors.monthlyHousingPayment?.message !== undefined}
          helperText={errors.monthlyHousingPayment?.message}
          defaultValue={cachedData.monthlyHousingPayment}
        />
        <TextField 
          {...register("checkingAmount")}
          required 
          id="standard-required" 
          label="Amount in Checking"
          style={{ display: 'flex', margin: '0 0 25px 0' }}
          error={errors.checkingAmount?.message !== undefined}
          helperText={errors.checkingAmount?.message}
          defaultValue={cachedData.checkingAmount}
        />
        <TextField 
          {...register("savingsAmount")}
          required 
          id="standard-required" 
          label="Amount in Savings"
          style={{ display: 'flex', margin: '0 0 25px 0' }}
          error={errors.savingsAmount?.message !== undefined}
          helperText={errors.savingsAmount?.message}
          defaultValue={cachedData.savingsAmount}
        />
        <TextField 
          {...register("investmentsAmount")}
          required 
          id="standard-required" 
          label="Amount in Investments"
          style={{ display: 'flex', margin: '0 0 25px 0' }}
          error={errors.investmentsAmount?.message !== undefined}
          helperText={errors.investmentsAmount?.message}
          defaultValue={cachedData.investmentsAmount}
        />
        <div style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row' }}>
          {/* <Button variant="contained">
            Cancel
          </Button>
          <Button variant="contained" color="secondary">
            Previous
          </Button> */}
          <Button variant="contained" color="primary" type="submit">
            Submit Applciation
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreditFormFinancialInfo;
