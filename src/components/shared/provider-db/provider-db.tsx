import React from 'react'

import { dbContext, useProviderDB } from '@services'

// Emulates a DB for the simple app.  This makes it available to the
// children elements of this element.
export interface ProviderDBProps {
  children: React.ReactNode
}

export const ProviderDB = (props: ProviderDBProps) => {
  const db = useProviderDB()
  return <dbContext.Provider value={db}>{props.children}</dbContext.Provider>
}

export default ProviderDB
