import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Notification from './components/Notification'

import Login from './components/Login'

import { getBlogs } from './reducers/blogReducer'
import { logoutUser, setUserState } from './reducers/loginReducer'
import UserList from './components/UserList'
import BlogList from './components/BlogList'
import UserInfo from './components/UserInfo'
import BlogInfo from './components/Blog'
import { getAllUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()
  // Returns token, username and name
  const user = useSelector(state => state.login)

  useEffect(() => {
    dispatch(getBlogs())
    dispatch(getAllUsers())
  }, [])

  useEffect(() => {
    const logged = window.localStorage.getItem('loggedInUser')
    if (logged) {
      const pu = JSON.parse(logged)
      dispatch(setUserState(pu))
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    dispatch(logoutUser())
  }

  const padding = {
    padding: 5
  }

  if (!user) {
    return <Login></Login>
  }

  return (
    <div>
      <Router>
        <div>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/users">users</Link>
        </div>

         <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>

        <Notification />

        <Routes>
          <Route path="/blogs/:id" element={<BlogInfo/>}></Route>
          <Route path="/users/:id" element={<UserInfo/>}></Route>
          <Route path="/users" element={<UserList/>}></Route>
          <Route path="/" element={<BlogList/>}></Route>
        </Routes>

      </Router>
    </div>
  )
}

export default App
