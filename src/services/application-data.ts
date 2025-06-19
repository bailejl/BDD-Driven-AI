// TypeScript interface for application data
export interface ApplicationData {
  id: string
  firstName: string
  middleInitial: string
  lastName: string
  dateOfBirth: Date
  ssn: string
  countryOfCitizenShip: string
  countryOfCitizenShipSecondary: string
  currentEmployerName: string
  workPhone: string
  yearsEmployed: number
  monthsEmployed: number
  occupation: string
  monthlyHousingPayment: number
  checkingAmount: number
  savingsAmount: number
  investmentsAmount: number
  monthlyIncome: number
}

// Factory function to create a new ApplicationData object
export const createApplicationData = (): ApplicationData => ({
  id: '',
  firstName: '',
  middleInitial: '',
  lastName: '',
  dateOfBirth: new Date(),
  ssn: '',
  countryOfCitizenShip: '',
  countryOfCitizenShipSecondary: '',
  currentEmployerName: '',
  workPhone: '',
  yearsEmployed: 0,
  monthsEmployed: 0,
  occupation: '',
  monthlyHousingPayment: 0,
  checkingAmount: 0,
  savingsAmount: 0,
  investmentsAmount: 0,
  monthlyIncome: 0
})

// Helper function to create ApplicationData with partial data
export const createApplicationDataWithDefaults = (data: Partial<ApplicationData>): ApplicationData => ({
  ...createApplicationData(),
  ...data
})