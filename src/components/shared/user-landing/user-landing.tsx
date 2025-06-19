import { Typography } from '@mui/material';
import React from 'react';
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import CreditFormIntro from '../../forms/credit-form-intro/credit-form-intro';
import FormWizardContext from '../../forms/form-wizard-context/form-wizard-context';
import UserAppStatus from '../user-app-status/user-app-status';

import './user-landing.module.scss';

/* eslint-disable-next-line */
export interface UserLandingProps {}

// When a user account successfully logs in, they will arrive at this page.
export const UserLanding = () => {
  // React Router v7 uses relative paths automatically
  const location = useLocation();

  return (
    location.pathname === "/user" ? (
      <div style={{display:'flex', flexGrow: 2}}>
      <Typography variant="h5" style={{display:'flex', justifyContent: 'center', flexGrow: 1}}>
        Welcome to user-landing!
      </Typography>
    </div>
    ) : (
      <Routes>
        <Route path="form/*" element={
          <FormWizardContext>
            <CreditFormIntro />
          </FormWizardContext>
        } />
        <Route path="status" element={<UserAppStatus />} />
      </Routes>
    )
  );
}

export default UserLanding;
