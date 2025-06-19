import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import AuthButton from './auth-button'

const mockSignout = jest.fn()
const mockNavigate = jest.fn()

// Mock the auth service
jest.mock('@services', () => ({
  useAuth: jest.fn(),
}))

import { useAuth } from '@services'
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

describe('AuthButton', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render login button when user is not authenticated', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      signin: jest.fn(),
      signout: mockSignout,
    })

    render(
      <MemoryRouter>
        <AuthButton />
      </MemoryRouter>
    )

    expect(screen.getByText('Sign In')).toBeInTheDocument()
    expect(screen.queryByText('Sign Out')).not.toBeInTheDocument()
  })

  it('should render logout button when user is authenticated', () => {
    mockUseAuth.mockReturnValue({
      user: 'testuser',
      signin: jest.fn(),
      signout: mockSignout,
    })

    render(
      <MemoryRouter>
        <AuthButton />
      </MemoryRouter>
    )

    expect(screen.getByText('Sign Out')).toBeInTheDocument()
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument()
  })

  it('should navigate to login when login button is clicked', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      signin: jest.fn(),
      signout: mockSignout,
    })

    render(
      <MemoryRouter>
        <AuthButton />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByText('Sign In'))
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })

  it('should call signout and navigate to home when logout button is clicked', () => {
    mockUseAuth.mockReturnValue({
      user: 'testuser',
      signin: jest.fn(),
      signout: mockSignout,
    })

    render(
      <MemoryRouter>
        <AuthButton />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByText('Sign Out'))

    expect(mockSignout).toHaveBeenCalled()
    // The signout callback should navigate to home
    const signoutCallback = mockSignout.mock.calls[0][0]
    signoutCallback()
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('should handle missing auth context gracefully', () => {
    useAuth.mockReturnValue(null)

    const { baseElement } = render(
      <MemoryRouter>
        <AuthButton />
      </MemoryRouter>
    )

    expect(baseElement).toBeTruthy()
  })
})
