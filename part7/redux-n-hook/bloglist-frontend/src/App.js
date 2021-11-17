import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'

import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from './reducers/notificationReducer'
import { getBlogs, removeBlog, likeBlog } from './reducers/blogReducer'
import { loginUser, logoutUser, setUserState } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.login)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(getBlogs())
  }, [])

  useEffect(() => {
    const logged = window.localStorage.getItem('loggedInUser')
    if (logged) {
      const pu = JSON.parse(logged)
      dispatch(setUserState(pu))
    }
  }, [dispatch])

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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    dispatch(logoutUser())
  }

  const handleLike = async (blog) => {
    try {
      dispatch(likeBlog(blog))
      dispatch(createNotification(`${blog.title} liked`))
    } catch (error) {
      dispatch(createNotification('Something went wrong with liking', 'error'))
    }
  }

  const handleRemove = async (blog) => {
    const id = blog.id
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      await dispatch(removeBlog(id))
    }
  }

  if (!user) {
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

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>

      <Notification/>

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog/>
      </Togglable>

      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          user={user}
        />
      )}
    </div>
  )
}

export default App
