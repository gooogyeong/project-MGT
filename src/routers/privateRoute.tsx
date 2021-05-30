import React, { useContext } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { AuthContext } from '@/components/Auth'
import firebase from 'firebase/compat'

type PrivateRouteProps = {
  component: React.ElementType;
  exact: RouteProps['exact'];
  path: RouteProps['path'];
}
const PrivateRoute = ({ component: RouteComponent, ...rest }: PrivateRouteProps) => {
  const { currentUser } = useContext(AuthContext) as { currentUser: firebase.User | null; }
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={'/login'}/>
        )
      }
    />
  )
}


export default PrivateRoute
