import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { LOGIN } from '../queries'

const Login = ({setError, setToken}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('lib-user-token', token)
    } 
  }, [result.data]) // eslint-disable-line

  const submit = async (e) => {
    e.preventDefault()
    await login({variables: {username, password}})

  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          <label>Username</label>
          <input type='text' value={username} onChange={({target}) => setUsername(target.value) }></input>
        </div>
        <div>
          <label>Password</label>
          <input type='password' value={password} onChange={({target}) => setPassword(target.value) }></input>
        </div>
        <button type='submit'>Log in</button>
      </form>
    </div>
  )
}

export default Login