import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/loginReducer'

const Nav = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.login)

  const padding = {
    padding: 5
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    dispatch(logoutUser())
  }
  return (
    <div>
      <Link style={padding} to="/">home</Link>
      <Link style={padding} to="/users">users</Link>
      <span style={padding}>{user.name} logged in <button onClick={handleLogout}>logout</button></span>
    </div>
  )
}

export default Nav
