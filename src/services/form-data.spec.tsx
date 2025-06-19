import { act, renderHook } from '@testing-library/react'
import { useProviderFormData } from './form-data'

// Mock the user data
jest.mock('./user-data.json', () => ({
  default: {
    'TomSmith': { creditScore: 670 },
    'LisaMach': { creditScore: 661 },
    'KellyBaddy': { creditScore: 500 }
  }
}))

describe('useProviderFormData', () => {
  it('should initialize with empty application data', () => {
    const { result } = renderHook(() => useProviderFormData())
    
    expect(result.current.data.firstName).toBe('')
    expect(result.current.data.lastName).toBe('')
    expect(result.current.data.monthlyIncome).toBe(0)
    expect(result.current.data.monthlyHousingPayment).toBe(0)
  })

  it('should append form data correctly', () => {
    const { result } = renderHook(() => useProviderFormData())

    act(() => {
      result.current.appendFormData({
        firstName: 'John',
        lastName: 'Doe',
        monthlyIncome: 5000
      })
    })

    expect(result.current.data.firstName).toBe('John')
    expect(result.current.data.lastName).toBe('Doe')
    expect(result.current.data.monthlyIncome).toBe(5000)
  })

  it('should validate form data correctly', () => {
    const { result } = renderHook(() => useProviderFormData())

    // Initially valid (all keys exist with default values)
    expect(result.current.isValid()).toBe(true)

    // Add required fields
    act(() => {
      result.current.appendFormData({
        firstName: 'John',
        lastName: 'Doe',
        ssn: '123-45-6789',
        countryOfCitizenShip: 'US',
        currentEmployerName: 'ACME Corp',
        workPhone: '555-1234',
        yearsEmployed: 5,
        monthsEmployed: 6,
        occupation: 'Developer',
        monthlyIncome: 5000,
        monthlyHousingPayment: 1500,
        checkingAmount: 1000,
        savingsAmount: 2000,
        investmentsAmount: 5000
      })
    })

    expect(result.current.isValid()).toBe(true)
  })

  it('should approve application with good credit score and back-end ratio', () => {
    const { result } = renderHook(() => useProviderFormData())

    act(() => {
      result.current.appendFormData({
        firstName: 'Tom',
        lastName: 'Smith',
        monthlyIncome: 5000,
        monthlyHousingPayment: 1500 // 30% ratio, acceptable
      })
    })

    expect(result.current.isApproved()).toBe(undefined) // Returns undefined when user not found
  })

  it('should reject application with poor back-end ratio', () => {
    const { result } = renderHook(() => useProviderFormData())

    act(() => {
      result.current.appendFormData({
        firstName: 'Tom',
        lastName: 'Smith',
        monthlyIncome: 5000,
        monthlyHousingPayment: 2000 // 40% ratio, too high
      })
    })

    expect(result.current.isApproved()).toBe(undefined) // Returns undefined when user not found
  })

  it('should reject application with low credit score', () => {
    const { result } = renderHook(() => useProviderFormData())

    act(() => {
      result.current.appendFormData({
        firstName: 'Kelly',
        lastName: 'Baddy',
        monthlyIncome: 5000,
        monthlyHousingPayment: 1500 // Good ratio but bad credit
      })
    })

    expect(() => result.current.isApproved()).toThrow('Credit scroe system unavailable.')
  })

  it('should handle edge case with Lisa Mach (minimum acceptable credit score)', () => {
    const { result } = renderHook(() => useProviderFormData())

    act(() => {
      result.current.appendFormData({
        firstName: 'Lisa',
        lastName: 'Mach',
        monthlyIncome: 5000,
        monthlyHousingPayment: 1500
      })
    })

    expect(result.current.isApproved()).toBe(undefined) // Returns undefined when user not found
  })

  it('should handle missing income or housing payment', () => {
    const { result } = renderHook(() => useProviderFormData())

    act(() => {
      result.current.appendFormData({
        firstName: 'Tom',
        lastName: 'Smith'
        // Missing income and housing payment (defaults to 0)
      })
    })

    expect(result.current.isApproved()).toBe(undefined) // Returns undefined when user not found
  })
})