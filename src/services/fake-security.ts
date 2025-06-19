// Code here is based on code from: https://reactrouter.com/web/example/auth-workflow

import { useContext, createContext, useState } from "react";

export const authContext = createContext<any>(null);

// This provides the core auth functions
const fakeAuth = {
  isAuthenticated: false,
  signin(username: string, password: string, successCb: any, failCb: any) {
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
  signout(cb: any) {
    fakeAuth.isAuthenticated = false;
    localStorage.removeItem('user');
    setTimeout(cb, 100);
  }
};

export function useAuth() {
  return useContext(authContext);
}

// This provides the auth unctions via a hook.
export function useProvideAuth() {
  // TODO need to change the username to null to get rid of the auto login
  const [user, setUser] = useState<string | null>(null);
  // const [password, setPassword] = useState(null);

  const storedUser = localStorage.getItem('user');
  if (storedUser && user !== storedUser) {
    setUser(storedUser);
  }

  const signin = (username: any, password: any, successCb: any, failCb: any) => {
    return fakeAuth.signin(username, password,
      () => {
        setUser(username);
        successCb();
      },
      (failMsg: any) => {
        setUser(null);
        failCb(failMsg);
      });
  };

  const signout = (cb: any) => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout
  };
}
export function fakeSecurity(): string {
  return 'fake-security';
}
