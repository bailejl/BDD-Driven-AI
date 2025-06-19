import { List, ListItem, ListItemText, Paper } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  useLocation,
} from 'react-router-dom'

import './side-nav.module.scss'

interface ListItemLinkProps {
  icon?: React.ReactElement
  primary: string
  to: string
  pathname: string
  pathPrefix: string
  id: string
}

// Builds a valid list item for Material Design to consume
const ListItemLink = (props: ListItemLinkProps) => {
  const { primary, to, id } = props

  const renderLink = React.useMemo(() => {
    const RouterLinkComponent = React.forwardRef<
      HTMLAnchorElement,
      Omit<RouterLinkProps, 'to'>
    >((itemProps, ref) => (
      <RouterLink id={id} to={to} ref={ref} {...itemProps} />
    ))
    RouterLinkComponent.displayName = 'RouterLinkComponent'
    return RouterLinkComponent
  }, [to, id])

  // Used to highlight the list item, if it matches the current page.

  return (
    <li>
      <ListItem id={id} component={renderLink}>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  )
}
/* eslint-disable-next-line */
export interface SideNavProps {}

const useStyles = makeStyles({
  root: {
    width: 140,
    justifyContent: 'flex-start',
  },
  hide: {
    display: 'none',
  },
})

export const SideNav = () => {
  const classes = useStyles()
  const location = useLocation()

  const sideNav = (() => {
    if (location !== null && location.pathname.startsWith('/user')) {
      return (
        <Paper elevation={3}>
          <List aria-label="main mailbox folders">
            <ListItemLink
              id="apply-link"
              to="/user/form"
              primary="Apply"
              pathname={location.pathname}
              pathPrefix="/user/form"
            />
            {/* <ListItemLink id="status-link" to="/user/status" primary="Check status" pathname={location.pathname} pathPrefix="/user/status" />  */}
          </List>
        </Paper>
      )
    }
    return null
  })()

  return location === null || location.pathname === '/' ? (
    <div className={classes.hide}></div>
  ) : (
    <div className={classes.root}>{sideNav}</div>
  )
}

export default SideNav
