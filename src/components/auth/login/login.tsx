import React from 'react';

import './login.module.scss';

import {
  useNavigate,
  useLocation
} from "react-router-dom";

import { useAuth } from '@services';
import { Box, TextField, Typography } from '@mui/material';
import classes from './login.module.scss';
import { Button } from '@mui/material';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface LoginProps { }

// Uses the emulating auth service to provide a basic login and user session.
export function Login(props: LoginProps) {
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const [username, setUserName] = useState(null);
  // TODO replace with a null to remove the auto password populate  
  const [password, setPassword] = useState("");
  const [failMsg, setFailMsg] = useState("");

  const { from } = location.state || { from: { pathname: "/" } };
  const login = (username: string, password: string) => {
    auth.signin(username, password,
      () => {
        navigate(from, { replace: true });
      },
      (failMsg) => {
        setFailMsg(failMsg);
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(username, password);
  }

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }
  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off"
        onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column">
          <div id="failMsg" style={{display:'flex', minHeight:'2.5rem', justifyContent:'center', alignItems:'center'}}
            >
            <Typography variant="h6" color="error">{failMsg}</Typography>
            </div>
          <TextField style={{display:'flex'}} id="username" label="username" 
            onChange={handleUsernameChange} />
          <TextField style={{display:'flex'}} id="password" label="password" 
            type="password" value={password}
            onChange={handlePasswordChange} />
          <Button type="submit" style={{display:'flex'}}>Login</Button>
        </Box>
      </form>
    </div>
  );
}

export default Login;
