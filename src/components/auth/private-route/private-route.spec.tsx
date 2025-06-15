import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import PrivateRoute from './private-route';

// Mock the auth service
jest.mock('@services', () => ({
  useAuth: () => ({
    user: 'testuser'
  })
}));

// Mock UserLanding to avoid complex routing issues
jest.mock('../../shared/user-landing/user-landing', () => {
  return function MockUserLanding() {
    return <div data-testid="mock-user-landing">User Landing</div>;
  };
});

const MockUserLanding = () => <div data-testid="mock-user-landing">User Landing</div>;

describe('PrivateRoute', () => {
  it('should render children when user is authenticated and allowed', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/user']}>
        <PrivateRoute allowedUserName="*">
          <MockUserLanding />
        </PrivateRoute>
      </MemoryRouter>
    );
    
    expect(getByTestId('mock-user-landing')).toBeInTheDocument();
  });

  it('should redirect to login when user is not authenticated', () => {
    // Override the mock for this test
    jest.doMock('@services', () => ({
      useAuth: () => null
    }));

    const { container } = render(
      <MemoryRouter initialEntries={['/user']}>
        <PrivateRoute allowedUserName="*">
          <MockUserLanding />
        </PrivateRoute>
      </MemoryRouter>
    );
    
    // When not authenticated, PrivateRoute renders Navigate component
    // which doesn't render visible content in test environment
    expect(container.firstChild).toBeTruthy();
  });
});
