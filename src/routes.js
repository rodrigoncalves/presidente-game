import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/Login'
import Room from './pages/Room'

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login}></Route>
      <Route path="/room" exact component={Room}></Route>
    </Switch>
  </BrowserRouter>
)
