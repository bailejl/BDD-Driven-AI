import { createContext, useContext, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { ApplicationData } from './application-data'

export interface DBContextType {
  applications: ApplicationData[]
  addUpdateApplication: (app: ApplicationData) => void
  deleteApplication: (deleteApp: ApplicationData) => void
}

export const dbContext = createContext<DBContextType | null>(null)

export const useDB = () => useContext(dbContext)

// Emulates a simple DB for app data and provided via a hook.
export const useProviderDB = () => {
  const [applications, setApplications] = useState<ApplicationData[]>([])

  const addUpdateApplication = (app: ApplicationData) => {
    if (!app || app.id) {
      // do not add empty app or an already saved one.
      return
    }
    app.id = uuid()
    applications.push(app)
    setApplications(applications)
  }

  const deleteApplication = (deleteApp: ApplicationData) => {
    const newAppData = applications.filter(
      app => deleteApp && deleteApp.id && app.id === deleteApp.id
    )
    setApplications(newAppData)
  }

  return {
    applications,
    addUpdateApplication,
    deleteApplication,
  }
}
