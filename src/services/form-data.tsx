import { createContext, useContext, useState } from 'react'

import { ApplicationData, createApplicationData } from './application-data'
import * as userData from './user-data.json'

export interface FormDataContextType {
  data: ApplicationData
  appendFormData: (dataFragment: Partial<ApplicationData>) => void
  isValid: () => boolean
  isApproved: () => boolean | undefined
}

export const formDataContext = createContext<FormDataContextType | null>(null)

/*
  This handles data used by the credit application form for a new credit card.
  There are several validation functions to confirm a new request form is 
  valid for the next stage of processing
*/

export const useFormData = () => useContext(formDataContext)

interface UserData {
  creditScore: number
}

const getUserData = (
  firstName: string,
  lastName: string
): UserData | undefined => {
  const userDataObj = userData as unknown as {
    default: Record<string, UserData>
  }
  return userDataObj.default[firstName + lastName]
}

// This function emulates a call to a remote credit score system.  It will
// even fail, if the user is "Kelly Baddy".
const isAcceptableCreditScore = (
  data: ApplicationData
): boolean | undefined => {
  if (data.firstName === 'Kelly' && data.lastName === 'Baddy') {
    throw new Error('Credit score system unavailable.')
  }
  const user = getUserData(data.firstName, data.lastName)
  return user && user.creditScore >= 661
}

// This does a monthly debt to income check and ensure is acceptable.
const isAcceptableBackEndRatio = (
  data: ApplicationData
): boolean | undefined => {
  if (data && data.monthlyHousingPayment && data.monthlyIncome) {
    const backEndRatio = data.monthlyHousingPayment / data.monthlyIncome
    const result = backEndRatio <= 0.36
    return result
  }
}

// This makes the application data available via a hook.
export const useProviderFormData = () => {
  const [data, setData] = useState<ApplicationData>(createApplicationData())

  const appendFormData = (dataFragment: Partial<ApplicationData>) => {
    const newData = Object.assign(data, dataFragment)
    return setData(newData)
  }
  const isValid = () =>
    Object.keys(data).every(
      key =>
        // eslint-disable-next-line security/detect-object-injection
        (data as unknown as Record<string, unknown>)[key] !== undefined ||
        key === 'countryOfCitizenShipSecondary' ||
        key === 'id'
    )
  const isApproved = () =>
    isAcceptableCreditScore(data) && isAcceptableBackEndRatio(data)
  return {
    data,
    appendFormData,
    isValid,
    isApproved,
  }
}
