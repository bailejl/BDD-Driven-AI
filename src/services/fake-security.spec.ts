import { act, renderHook } from '@testing-library/react'
import { fakeSecurity, useProvideAuth } from './fake-security'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock setTimeout to make tests synchronous
jest.useFakeTimers()

describe('fakeSecurity', () => {
  it('should return fake-security string', () => {
    expect(fakeSecurity()).toEqual('fake-security')
  })
})

describe('useProvideAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    localStorageMock.getItem.mockReturnValue(null)
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
  })

  it('should initialize with null user', () => {
    const { result } = renderHook(() => useProvideAuth())

    expect(result.current.user).toBe(null)
    expect(typeof result.current.signin).toBe('function')
    expect(typeof result.current.signout).toBe('function')
  })

  it('should restore user from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('testuser')

    const { result, rerender } = renderHook(() => useProvideAuth())

    // Force re-render to trigger localStorage check
    rerender()

    expect(result.current.user).toBe('testuser')
  })

  it('should sign in successfully with correct credentials', () => {
    const { result } = renderHook(() => useProvideAuth())
    const successCallback = jest.fn()
    const failCallback = jest.fn()

    act(() => {
      result.current.signin(
        'testuser',
        'GhekinIsFun',
        successCallback,
        failCallback
      )
    })

    act(() => {
      jest.runAllTimers()
    })

    expect(successCallback).toHaveBeenCalled()
    expect(failCallback).not.toHaveBeenCalled()
    expect(result.current.user).toBe('testuser')
    expect(localStorageMock.setItem).toHaveBeenCalledWith('user', 'testuser')
  })

  it('should fail signin with incorrect password', () => {
    const { result } = renderHook(() => useProvideAuth())
    const successCallback = jest.fn()
    const failCallback = jest.fn()

    act(() => {
      result.current.signin(
        'testuser',
        'wrongpassword',
        successCallback,
        failCallback
      )
    })

    act(() => {
      jest.runAllTimers()
    })

    expect(successCallback).not.toHaveBeenCalled()
    expect(failCallback).toHaveBeenCalledWith('Failed login attempt.')
    expect(result.current.user).toBe(null)
    expect(localStorageMock.setItem).not.toHaveBeenCalled()
  })

  it('should fail signin with null username', () => {
    const { result } = renderHook(() => useProvideAuth())
    const successCallback = jest.fn()
    const failCallback = jest.fn()

    act(() => {
      result.current.signin(
        null as unknown as string,
        'GhekinIsFun',
        successCallback,
        failCallback
      )
    })

    act(() => {
      jest.runAllTimers()
    })

    expect(successCallback).not.toHaveBeenCalled()
    expect(failCallback).toHaveBeenCalledWith('Failed login attempt.')
    expect(result.current.user).toBe(null)
  })

  it('should fail signin with undefined username', () => {
    const { result } = renderHook(() => useProvideAuth())
    const successCallback = jest.fn()
    const failCallback = jest.fn()

    act(() => {
      result.current.signin(
        undefined as unknown as string,
        'GhekinIsFun',
        successCallback,
        failCallback
      )
    })

    act(() => {
      jest.runAllTimers()
    })

    expect(successCallback).not.toHaveBeenCalled()
    expect(failCallback).toHaveBeenCalledWith('Failed login attempt.')
    expect(result.current.user).toBe(null)
  })

  it('should fail signin with null password', () => {
    const { result } = renderHook(() => useProvideAuth())
    const successCallback = jest.fn()
    const failCallback = jest.fn()

    act(() => {
      result.current.signin(
        'testuser',
        null as unknown as string,
        successCallback,
        failCallback
      )
    })

    act(() => {
      jest.runAllTimers()
    })

    expect(successCallback).not.toHaveBeenCalled()
    expect(failCallback).toHaveBeenCalledWith('Failed login attempt.')
    expect(result.current.user).toBe(null)
  })

  it('should fail signin with undefined password', () => {
    const { result } = renderHook(() => useProvideAuth())
    const successCallback = jest.fn()
    const failCallback = jest.fn()

    act(() => {
      result.current.signin(
        'testuser',
        undefined as unknown as string,
        successCallback,
        failCallback
      )
    })

    act(() => {
      jest.runAllTimers()
    })

    expect(successCallback).not.toHaveBeenCalled()
    expect(failCallback).toHaveBeenCalledWith('Failed login attempt.')
    expect(result.current.user).toBe(null)
  })

  it('should sign out successfully', () => {
    // Start with user signed in
    const { result } = renderHook(() => useProvideAuth())
    const signoutCallback = jest.fn()

    // First sign in a user
    act(() => {
      result.current.signin('testuser', 'GhekinIsFun', jest.fn(), jest.fn())
    })

    act(() => {
      jest.runAllTimers()
    })

    expect(result.current.user).toBe('testuser')

    // Then sign out
    act(() => {
      result.current.signout(signoutCallback)
    })

    act(() => {
      jest.runAllTimers()
    })

    expect(signoutCallback).toHaveBeenCalled()
    expect(result.current.user).toBe(null)
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('user')
  })
})
