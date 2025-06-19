import React from 'react';

import {
  Navigate,
  useLocation
} from "react-router-dom";

import './private-route.module.scss';

import {useAuth} from '@services';

/* eslint-disable-next-line */
export interface PrivateRouteProps {
}

// based on code from https://reactrouter.com/web/example/auth-workflow
export function PrivateRoute( { children, allowedUserName }: { children: any, allowedUserName: string }) {
  const auth = useAuth();
  const location = useLocation();

  const isAllowed = auth !== null && (auth.user === allowedUserName || 
     (allowedUserName === "*" && auth.user !== null));
     
  return isAllowed ? (
    children
  ) : (
    <Navigate
      to="/login"
      state={{ from: location }}
      replace
    />
  );
}

export default PrivateRoute;
