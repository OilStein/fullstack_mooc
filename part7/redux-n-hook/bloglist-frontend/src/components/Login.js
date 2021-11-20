import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loginUser } from '../reducers/loginReducer'
import { createNotification } from '../reducers/notificationReducer'
import Notification from './Notification'

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.login)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(loginUser({ username, password }))
      console.log(user)
      dispatch(createNotification(`Welcome, ${user.username}`))

      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(createNotification('Wrong username or password', 'error'))
    }
  }

  return (
    <div>
    <h2>login to application</h2>

    <Notification/>

    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login'>login</button>
    </form>
  </div>
  )
}

export default Login
