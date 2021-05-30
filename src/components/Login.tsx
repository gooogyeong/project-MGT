import React, { useCallback, useContext } from 'react'
import { withRouter, Redirect } from 'react-router'
import { AuthContext } from '@/components/Auth'
import { auth } from '@/services/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import styled from 'styled-components'
import firebase from 'firebase/compat'
import { RouteComponentProps } from 'react-router-dom'
import { History } from 'history'

// interface ChildComponentProps extends RouteComponentProps<any> // {
/* other props for ChildComponent */
// }

type LoginProps = {
  history: History;
}

// const Login: React.FC = ({ history }: RouteComponentProps<any>) => {
const Login: React.FC<LoginProps> = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault()
      const { email, password } = event.target.elements
      try {
        // const res = await signInWithEmailAndPassword(auth, 'hyewon', '12345')
        // console.log(res)
        history.push('/')
      } catch (error) {
        alert(error)
      }
    },
    [history]
  )

  const handleSignUp = useCallback(async event => {
    event.preventDefault()
    // const { email, password } = event.target.elements
    try {
      const res = await createUserWithEmailAndPassword(auth, '1015hyewon@snu.ac.kr', '12345Ok*^')
      console.log(res)
      history.push('/')
    } catch (error) {
      alert(error)
    }
  }, [history])

  const { currentUser } = useContext(AuthContext) as { currentUser: firebase.User | null; }

  if (currentUser) {
    return <Redirect to="/"/>
  }

  return (
    <MGTLogin>
      <button onClick={handleSignUp}>signup</button>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email"/>
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password"/>
        </label>
        <button type="submit">Log in</button>
      </form>
      {/*<h1>Login</h1>*/}
      {/*<div>*/}
      {/*  <label>ID</label>*/}
      {/*  <input type='text' spellCheck={false}></input>*/}
      {/*</div>*/}
      {/*<div>*/}
      {/*  <label>PW</label>*/}
      {/*  <input type='password'></input>*/}
      {/*</div>*/}
    </MGTLogin>
  )
}

const MGTLogin = styled.div`
label {
width: 3rem;
}
input {
width: 12rem;
}
`

export default Login
