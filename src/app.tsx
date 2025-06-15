import React from 'react';

import styles from './app.module.scss';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import {
  AdminLanding,
  Header,
  Introduction,
  Login,
  PrivateRoute,
  ProviderAuth,
  UserLanding,
  SideNav,
  ProviderDB,
} from '@components';

/*
* Main app layout with components enulating a remote DB/API and auth server.
*/
export function App() {
  return (
    <div className={styles.app}>
      <Router>
        <ProviderDB>
          <ProviderAuth>
            <Header />
            <main className={styles.mainFrame}>
              <SideNav />
              <Routes>
                <Route path="/" element={<Introduction />} />
                <Route path="/login" element={<Login />} />
                <Route path="/user/*" element={<PrivateRoute allowedUserName="*"><UserLanding /></PrivateRoute>} />
                <Route path="/admin/*" element={<PrivateRoute allowedUserName="admin"><AdminLanding /></PrivateRoute>} />
              </Routes>
            </main>
          </ProviderAuth>
        </ProviderDB>
      </Router>
    </div>
  );
}

export default App;
