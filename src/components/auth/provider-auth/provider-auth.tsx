import React from 'react'

import { authContext, useProvideAuth } from '@services'

// This is a simple auth service based on the code from:
// https://reactrouter.com/web/example/auth-workflow
export interface ProviderAuthProps {
  children: React.ReactNode
}

export const ProviderAuth = (props: ProviderAuthProps) => {
  const auth = useProvideAuth()
  return (
    <authContext.Provider value={auth}>{props.children}</authContext.Provider>
  )
}

export default ProviderAuth
