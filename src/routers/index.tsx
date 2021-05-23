import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MainPage from '@/pages/MainPage'
import WritePage from '@/pages/WritePage'

function AppRouter (): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage}/>
        <Route path="/write" component={WritePage}/>
      </Switch>
    </Router>
  )
}

export default AppRouter
