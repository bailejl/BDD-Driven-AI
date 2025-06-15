import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AuthButton from './auth-button';

// Mock the auth service
jest.mock('@services', () => ({
  useAuth: () => ({
    user: null,
    signin: jest.fn(),
    signout: jest.fn()
  })
}));

describe('AuthButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <AuthButton />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
