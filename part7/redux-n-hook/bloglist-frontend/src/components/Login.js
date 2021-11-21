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
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
             <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
              <Notification/>
        </div>

    <form onSubmit={handleLogin} className='"mt-8 space-y-6'>
      <div>
        <label htmlFor='username' className="sr-only">
                  Username
        </label>
        <input
          id='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          required
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder='Username'
        />
      </div>
      <div>
        <label htmlFor="password" className="sr-only">
                  Password
                </label>
        <input
          id='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          required
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Password"
        />
      </div>
      <button
                id='login'
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
    </form>
    </div>
  </div>
  )
}

export default Login
