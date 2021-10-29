import React, { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import User from './components/User'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginServise from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const BlogFormRef = useRef()

  useEffect(async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type = 'notification') => {
    // console.log(message, type)
    setNotification({ message, type })
    // console.log(notification)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const addBlog = async (blogObject) => {
    try {
      BlogFormRef.current.toggleVisibility()
      await blogService.create(blogObject)
      console.log(blogObject)
      setBlogs(await blogService.getAll())
      notify(`${blogObject.title} created`)
    } catch (error) {
      notify(error, 'error')
    }
  }

  const deleteBlog = async (item) => {
    const id = item.target.id
    console.log(id)
    const blog = blogs.find(n => n.id === id)
    console.log(blog)
    // const title = blog.title
    try {
      await blogService.remove(id)
      setBlogs(await blogService.getAll())
      notify(`${blog.title} deleted`)
    } catch (error) {
      notify(error, 'error')
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loginUser = await loginServise.login({
        username, password
      })

      console.log(loginUser)

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(loginUser)
      )
      blogService.setToken(loginUser.token)
      setUser(loginUser)
      setUsername('')
      setPassword('')
    } catch (error) {
      notify('wrong username or password', 'error')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log(username, 'logging out')

    try {
      window.localStorage.removeItem('loggedUser')
      setUser(null)
    } catch (error) {
      setNotification('Cant logout', 'error')
    }
  }

  const giveLike = async (item) => {
    const id = item.target.id
    const blog = blogs.find(n => n.id === id)
    // console.log(typeof blog.user.id)
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    console.log(updatedBlog)
    try {
      await blogService.update(id, updatedBlog)
      setBlogs(await blogService.getAll())
      notify(`${blog.title} was given a like`)
    } catch (error) {
      console.log(error)
      notify('failed to give a like', 'error')
    }
  }

  if (user === null) {
    return (
      <div>
      <Notification notification={notification}/>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification}/>
      <div>
        <User key={user.id} username={user.username} handleLogout={handleLogout}></User>
      </div>
      <div>
        <Togglable buttonLabel='create blog' ref={BlogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
      <div>
        {blogs.sort((firstItem, secondItem) => secondItem.likes - firstItem.likes).map((blog) =>
        <Blog
          key={blog.id}
          blog={blog}
          giveLike={giveLike}
          notify={notify}
          user={user.username}
          deleteBlog={deleteBlog}
          />)}
      </div>
    </div>

  )
}

export default App
