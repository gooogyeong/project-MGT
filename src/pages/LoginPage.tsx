import React from 'react'
import Login from '@/components/Login'
import { RouteComponentProps } from 'react-router-dom'
import { History } from 'history';

type LoginPageProps = {
  history: History
}

const LoginPage: React.FC<LoginPageProps> = ({ history }) => {

  return (
    <div>
      <Login history={history}/>
    </div>
  )
}

export default LoginPage
