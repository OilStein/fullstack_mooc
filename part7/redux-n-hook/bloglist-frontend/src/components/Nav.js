import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/loginReducer'

const Nav = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.login)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    dispatch(logoutUser())
  }
  return (
    <nav className='p-4'>
      <ul className="flex space-x-2">
        <li><Link className='nav-item' to="/">home</Link></li>
        <li><Link className='nav-item' to="/users">users</Link></li>
        <li>
          <span className='m-1' >{user.name} logged in
          <button className='pl-2 pr-2 rounded-md bg-yellow-300' onClick={handleLogout}>logout</button></span></li>
      </ul>

      </nav>
  )
}

export default Nav
