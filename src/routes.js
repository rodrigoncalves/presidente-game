import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Login from './pages/Login'
import Room from './pages/Room'

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login}></Route>
      <ProtectedRoute path="/room" component={Room}></ProtectedRoute>
    </Switch>
  </BrowserRouter>
)

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('nick') ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />
    }
  />
)
