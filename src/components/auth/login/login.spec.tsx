import React from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import Login from './login'

const mockNavigate = jest.fn()
const mockSignin = jest.fn()

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: jest.fn(() => ({
    state: { from: { pathname: '/dashboard' } },
  })),
}))

// Mock the auth service
jest.mock('@services', () => ({
  useAuth: jest.fn(),
}))

import { useAuth } from '@services'
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>

describe('Login', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseAuth.mockReturnValue({
      user: null,
      signin: mockSignin,
      signout: jest.fn(),
    })
  })

  it('should render successfully', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )
    expect(screen.getByLabelText('username')).toBeInTheDocument()
    expect(screen.getByLabelText('password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
  })

  it('should handle username input change', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    const usernameInput = screen.getByLabelText('username')
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })

    expect(usernameInput).toHaveValue('testuser')
  })

  it('should handle password input change', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    const passwordInput = screen.getByLabelText('password')
    fireEvent.change(passwordInput, { target: { value: 'testpass' } })

    expect(passwordInput).toHaveValue('testpass')
  })

  it('should call signin when form is submitted with valid credentials', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    const usernameInput = screen.getByLabelText('username')
    const passwordInput = screen.getByLabelText('password')
    const submitButton = screen.getByRole('button', { name: 'Login' })

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'GhekinIsFun' } })
    fireEvent.click(submitButton)

    expect(mockSignin).toHaveBeenCalledWith(
      'testuser',
      'GhekinIsFun',
      expect.any(Function),
      expect.any(Function)
    )
  })

  it('should navigate to redirect location on successful login', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    const usernameInput = screen.getByLabelText('username')
    const passwordInput = screen.getByLabelText('password')
    const submitButton = screen.getByRole('button', { name: 'Login' })

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'GhekinIsFun' } })
    fireEvent.click(submitButton)

    // Simulate successful login callback
    const successCallback = mockSignin.mock.calls[0][2]
    act(() => {
      successCallback()
    })

    expect(mockNavigate).toHaveBeenCalledWith(
      { pathname: '/dashboard' },
      { replace: true }
    )
  })

  it('should display error message on failed login', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    const usernameInput = screen.getByLabelText('username')
    const passwordInput = screen.getByLabelText('password')
    const submitButton = screen.getByRole('button', { name: 'Login' })

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } })
    fireEvent.click(submitButton)

    // Simulate failed login callback
    const failCallback = mockSignin.mock.calls[0][3]
    act(() => {
      failCallback('Failed login attempt.')
    })

    await waitFor(() => {
      expect(screen.getByText('Failed login attempt.')).toBeInTheDocument()
    })
  })

  it('should submit form with empty username', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    const passwordInput = screen.getByLabelText('password')
    const submitButton = screen.getByRole('button', { name: 'Login' })

    fireEvent.change(passwordInput, { target: { value: 'GhekinIsFun' } })
    fireEvent.click(submitButton)

    expect(mockSignin).toHaveBeenCalledWith(
      '',
      'GhekinIsFun',
      expect.any(Function),
      expect.any(Function)
    )
  })

  it('should handle missing auth context gracefully', () => {
    mockUseAuth.mockReturnValue(null)

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    const usernameInput = screen.getByLabelText('username')
    const passwordInput = screen.getByLabelText('password')
    const submitButton = screen.getByRole('button', { name: 'Login' })

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'GhekinIsFun' } })
    fireEvent.click(submitButton)

    // Should not crash when auth is null
    expect(mockSignin).not.toHaveBeenCalled()
  })

  it('should handle default location when no redirect state provided', () => {
    // Mock useLocation to return no state
    const mockUseLocation = jest.requireMock('react-router-dom').useLocation
    mockUseLocation.mockReturnValue({ state: null })

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    const usernameInput = screen.getByLabelText('username')
    const passwordInput = screen.getByLabelText('password')
    const submitButton = screen.getByRole('button', { name: 'Login' })

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'GhekinIsFun' } })
    fireEvent.click(submitButton)

    // Simulate successful login callback
    const successCallback = mockSignin.mock.calls[0][2]
    act(() => {
      successCallback()
    })

    // Should navigate to default location "/"
    expect(mockNavigate).toHaveBeenCalledWith(
      { pathname: '/' },
      { replace: true }
    )
  })
})
