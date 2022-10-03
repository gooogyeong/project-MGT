import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import MainView from '@/views/MainView'
import IntroView from '@/views/IntroView'
import PostListView from '@/views/post/PostListView'
import PostDetailView from '@/views/post/PostDetailView'
import LoginView from '@/views/LoginView'
import WriteView from '@/views/WriteView'
import EditView from '@/views/EditView'
import PrivateRoute from '@/routers/privateRoute'
import SubscribeView from '@/views/SubscribeView'

function AppRouter (): JSX.Element {
  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route exact path="/" component={MainView}/>
          <Route exact path="/intro" component={IntroView}/>
          <Route exact path="/post/list" component={PostListView}/>
          <Route exact path="/post/:id" component={PostDetailView}/>
          <Route exact path="/sub" component={SubscribeView}/>
          <Route exact path="/write/guest" component={WriteView}/>
          <Route path="/login" component={LoginView}/>
          <PrivateRoute exact path="/write" component={WriteView}/>
          <PrivateRoute exact path="/write/:postId" component={EditView}/>
        </Switch>
      </MainLayout>
    </Router>
  )
}

export default AppRouter
