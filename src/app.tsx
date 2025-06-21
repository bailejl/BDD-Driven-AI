import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import {
  AdminLanding,
  Header,
  Introduction,
  Login,
  PrivateRoute,
  ProviderAuth,
  ProviderDB,
  SideNav,
  UserLanding,
} from '@components'

import styles from './app.module.scss'

/*
 * Main app layout with components emulating a remote DB/API and auth server.
 */
export const App = () => (
  <div className={styles.app}>
    <Router>
      <ProviderDB>
        <ProviderAuth>
          <Header />
          <main className={styles['main-frame']}>
            <SideNav />
            <Routes>
              <Route path="/" element={<Introduction />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/user/*"
                element={
                  <PrivateRoute allowedUserName="*">
                    <UserLanding />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/*"
                element={
                  <PrivateRoute allowedUserName="admin">
                    <AdminLanding />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
        </ProviderAuth>
      </ProviderDB>
    </Router>
  </div>
)

export default App
