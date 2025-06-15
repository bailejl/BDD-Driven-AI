import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Login from './login';

// Mock the auth service
jest.mock('@services', () => ({
  useAuth: () => ({
    user: null,
    signin: jest.fn(),
    signout: jest.fn()
  })
}));

describe('Login', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});

