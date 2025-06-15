import { useFormData } from '@services';
import { Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useHistory,
} from "react-router-dom";

import './credit-form-personal-info.module.scss';

type PersonalInputs = {
  firstName: string,
  middleInitial: string,
  lastName: string,
  dateOfBirth: Date,
  ssn: string,
}

// validation for inputs
const schema = yup.object().shape({
  firstName: yup.string().required().min(3).matches(/^[A-Za-z .]+$/i),
  middleInitial: yup.string().required().length(1),
  lastName: yup.string().required().min(3),
  dateOfBirth: yup.date().required().min(new Date('1900-01-30T00:00:00')),
  ssn: yup.string().required().matches(/^[0-9]{3}-[0-9]{2}-[0-9]{4}$/),
});

/* eslint-disable-next-line */
export interface CreditFormPersonalInfoProps { }

// Creates the personal info section of the new credit card application form
export function CreditFormPersonalInfo(props: CreditFormPersonalInfoProps) {
  const { register, handleSubmit, setValue, errors } = useForm<PersonalInputs>({
    resolver: yupResolver(schema),
  });
  const formData = useFormData();
  const history = useHistory();

  const cachedData = formData.data;

  // Used to set data in the date input to mimic other inputs ability to handle 
  // cached data
  const handleDateChange = (date: Date | null) => {
    console.log('set date');
    console.dir(date);
    setValue('dateOfBirth', date, { shouldDirty: true });
  };

  // Move to the next page on completion.
  const onSubmit = (data) => {
    console.log("onSubmit")
    console.dir(data);
    formData.appendFormData(data);
    history.push("/user/form/page2");
  }

  // Handles cached data similary to other inputs, due to issue with date field
  React.useEffect(() => {
    register("dateOfBirth", { required: true }); // custom register dateOfBirth input
    if (cachedData.dateOfBirth) {
      setValue('dateOfBirth', cachedData.dateOfBirth, { shouldDirty: true });
    }
  }, [register, cachedData.dateOfBirth, setValue])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <Typography variant="h5">
        Personal Information
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <TextField name="firstName" required id="first-name" label="First Name"
          style={{ display: 'flex', margin: '10px 0 25px 0' }}
          inputRef={register({ required: true })}
          error={errors.firstName?.message !== undefined}
          helperText={errors.firstName?.message}
          value={cachedData.firstName}
        />
        <TextField name="middleInitial" required id="middle-initial" label="Middle Initial"
          style={{ display: 'flex', margin: '0 0 25px 0' }}
          inputRef={register({ required: true })}
          error={errors.middleInitial?.message !== undefined}
          helperText={errors.middleInitial?.message}
          value={cachedData.middleInitial}
        />
        <TextField name="lastName" required id="last-name" label="Last Name"
          style={{ display: 'flex', margin: '0 0 25px 0' }}
          inputRef={register({ required: true })}
          error={errors.lastName?.message !== undefined}
          helperText={errors.lastName?.message}
          value={cachedData.lastName}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            name="dateOfBirth"
            sx={{ display: 'flex', margin: '0 0 25px 0' }}
            format="MM/dd/yyyy"
            label="Date of Birth"
            value={cachedData.dateOfBirth || null}
            onChange={handleDateChange}
            slotProps={{
              textField: {
                required: true,
                id: "date-of-birth",
                error: errors.dateOfBirth?.message !== undefined,
                helperText: errors.dateOfBirth?.message
              }
            }}
          />
        </LocalizationProvider>
        <TextField name="ssn" required id="ssn" label="SSN"
          style={{ display: 'flex', margin: '0 0 25px 0' }}
          inputRef={register({ required: true })}
          error={errors.ssn?.message !== undefined}
          helperText={errors.ssn?.message}
          value={cachedData.ssn}
        />
        <div style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row' }}>
          <Button variant="contained">
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreditFormPersonalInfo;
