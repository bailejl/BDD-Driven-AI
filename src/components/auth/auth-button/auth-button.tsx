import { Button, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@services'

/* eslint-disable-next-line */
export interface AuthButtonProps {}

// based on code from https://reactrouter.com/web/example/auth-workflow
export const AuthButton = () => {
  const navigate = useNavigate()
  const auth = useAuth()
  const theme = useTheme()

  return auth != null && auth.user ? (
    <div style={{ display: 'flex' }}>
      <Button
        id="signout-button"
        aria-label="person"
        style={{ color: theme.palette.primary.contrastText }}
        onClick={() => {
          auth.signout(() => navigate('/'))
        }}
      >
        <Typography variant="button">Sign Out</Typography>
      </Button>
    </div>
  ) : (
    <div style={{ display: 'flex' }}>
      <Button
        id="signin-button"
        aria-label="person"
        style={{ color: theme.palette.primary.contrastText }}
        onClick={() => {
          navigate('/login')
        }}
      >
        <Typography variant="button">Sign In</Typography>
      </Button>
    </div>
  )
}

export default AuthButton
