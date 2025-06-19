// Code here is based on code from: https://reactrouter.com/web/example/auth-workflow

import { createContext, useContext, useState } from "react";

export interface AuthContextType {
  user: string | null
  signin: (username: string, password: string, successCb: () => void, failCb: (msg: string) => void) => void
  signout: (cb: () => void) => void
}

export const authContext = createContext<AuthContextType | null>(null);

// This provides the core auth functions
const fakeAuth = {
  isAuthenticated: false,
  signin(username: string, password: string, successCb: () => void, failCb: (msg: string) => void) {
    if (username === null || username === undefined || password === null ||
       password === undefined ||
       password !== "GhekinIsFun") {
      fakeAuth.isAuthenticated = false;
      setTimeout(failCb, 100, 'Failed login attempt.'); // fake async
      return
    }

    fakeAuth.isAuthenticated = true;
    localStorage.setItem('user', username);
    setTimeout(successCb, 100); // fake async
  },
  signout(cb: () => void) {
    fakeAuth.isAuthenticated = false;
    localStorage.removeItem('user');
    setTimeout(cb, 100);
  }
};

export const useAuth = () => useContext(authContext)

// This provides the auth unctions via a hook.
export const useProvideAuth = () => {
  // TODO need to change the username to null to get rid of the auto login
  const [user, setUser] = useState<string | null>(null);
  // const [password, setPassword] = useState(null);

  const storedUser = localStorage.getItem('user');
  if (storedUser && user !== storedUser) {
    setUser(storedUser);
  }

  const signin = (username: string, password: string, successCb: () => void, failCb: (msg: string) => void) => fakeAuth.signin(username, password,
      () => {
        setUser(username);
        successCb();
      },
      (failMsg: string) => {
        setUser(null);
        failCb(failMsg);
      });

  const signout = (cb: () => void) => fakeAuth.signout(() => {
      setUser(null);
      cb();
    });

  return {
    user,
    signin,
    signout
  };
}
export const fakeSecurity = (): string => 'fake-security'
