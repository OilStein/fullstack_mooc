import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'

import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from './reducers/notificationReducer'
import { getBlogs, removeBlog, updateBlog } from './reducers/blogReducer'
import { logoutUser, sUS } from './reducers/userReducer'
import { login } from './services/login'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

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
      dispatch(sUS(pu))
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await dispatch(login({ username, password }))
      dispatch(createNotification(`Welcome, ${user.username}`))

      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(createNotification('Wrong username or password', 'error'))
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    dispatch(logoutUser)
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
      user: blogToLike.user.id
    }
    dispatch(updateBlog(id, likedBlog))
    dispatch(createNotification(`${blogToLike.title} liked`))
  }

  const handleRemove = async (id) => {
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
          own={user.username === blog.user.username}
        />
      )}
    </div>
  )
}

export default App
