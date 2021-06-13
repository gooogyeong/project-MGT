import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MainPage from '@/pages/MainPage'
import LoginPage from '@/pages/LoginPage'
import WritePage from '@/pages/WritePage'
import EditPage from '@/pages/EditPage'
import PrivateRoute from '@/routers/privateRoute'

function AppRouter (): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage}/>
        <Route path="/login" component={LoginPage}/>
        <PrivateRoute exact path="/write" component={WritePage}/>
        <PrivateRoute exact path="/write/:postId" component={EditPage}/>
      </Switch>
    </Router>
  )
}

export default AppRouter
