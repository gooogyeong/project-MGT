import React, { useCallback, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Redirect } from 'react-router'
import { AuthContext } from '@/components/Auth'
import { auth } from '@/services/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import styled from 'styled-components'
import firebase from 'firebase/compat'

const Login = () => {
  const history = useHistory()

  const handleLogin = useCallback(
    async event => {
      event.preventDefault()
      const { email, password } = event.target.elements
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value)
        history.push('/')
      } catch (error) {
        console.log(error)
        alert(error)
      }
    },
    [history]
  )

  const { currentUser } = useContext(AuthContext) as { currentUser: firebase.User | null; }

  if (currentUser) {
    return <Redirect to="/"/>
  }

  return (
    <MGTLogin>
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
