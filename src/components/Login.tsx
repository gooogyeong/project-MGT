import React from 'react'
import styled from 'styled-components'

const Login: React.FC = () => {
  return (
    <MGTLogin>
      <h1>Login</h1>
      <div>
        <label>ID</label>
        <input type='text' spellCheck={false}></input>
      </div>
      <div>
        <label>PW</label>
        <input type='password'></input>
      </div>
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
