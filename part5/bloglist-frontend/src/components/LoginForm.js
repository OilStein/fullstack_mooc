import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Log in to App</h2>
    <form onSubmit={handleLogin}>
    <div>
      username
        <input
          id='username'
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
    </div>
    <div>
      password
        <input
          id='password'
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
    </div>
    <button id='login-button' type='submit'>login</button>
   </form>
   </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func,
  handleUsernameChange: PropTypes.func,
  handlePasswordChange: PropTypes.func,
  username: PropTypes.string,
  password: PropTypes.string
}

export default LoginForm
