import React from 'react';

import './provider-auth.module.scss';
import {useProvideAuth, authContext} from '@services';

// This is a simple auth service based on the code from:
// https://reactrouter.com/web/example/auth-workflow
export function ProviderAuth(props: any) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {props.children}
    </authContext.Provider>
  );
}

export default ProviderAuth;
