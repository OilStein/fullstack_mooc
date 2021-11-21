import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Notification from './components/Notification'

import Login from './components/Login'

import { getBlogs } from './reducers/blogReducer'
import { setUserState } from './reducers/loginReducer'
import UserList from './components/UserList'
import BlogList from './components/BlogList'
import UserInfo from './components/UserInfo'
import BlogInfo from './components/Blog'
import { getAllUsers } from './reducers/usersReducer'
import Nav from './components/Nav'

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

  if (!user) {
    return <Login></Login>
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <Router>
        <Nav/>

        <Notification />

        <Routes>
          <Route path="/blogs/:id" element={<BlogInfo/>}></Route>
          <Route path="/users/:id" element={<UserInfo/>}></Route>
          <Route path="/users" element={<UserList/>}></Route>
          <Route path="/" element={<BlogList/>}></Route>
        </Routes>

      </Router>
    </div>
    </div>
  )
}

export default App
