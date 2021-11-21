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

    <nav className='px-2'>
      <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className='md:block w-full md:w-auto'>
            <ul className='flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium' >
              <li>
                <Link to="/" className='nav-item2'>Home</Link>
              </li>
              <li>
                <Link to="/users" className='nav-item2'>Users</Link>
              </li>
              <li>
                <div className='nav-item1 text-lg'>
                  <span className='' >{user.name} logged in</span>
                  <button className='mx-2 px-1 bg-indigo-400 border border-indigo-500 rounded-md hover:bg-indigo-600' onClick={handleLogout}>Logout</button>
                </div>

              </li>
            </ul>

        </div>
      </div>

    </nav>

  )
}

export default Nav
