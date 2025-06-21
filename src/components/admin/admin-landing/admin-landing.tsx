import { Link, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

/* eslint-disable-next-line */
export interface AdminLandingProps {}

// Admin landing is not being used, may be used in the future.
export const AdminLanding = () => (
  <div>
    <h1>Welcome to admin-landing!</h1>
    <Typography variant="body2">
      <Link
        component={RouterLink}
        to="/"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        Home
      </Link>
    </Typography>
  </div>
)

export default AdminLanding
