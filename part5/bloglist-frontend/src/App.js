import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import User from './components/User'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginServise from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

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

  const addBlog = async (event) => {
    event.preventDefault()
    console.log('Add button clicked', event.target)

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {
      const updateBlog = await blogService.create(blogObject)
      console.log(updateBlog)
      setBlogs(blogs.concat(updateBlog))
      resetForm()
    } catch (error) {
      console.log(error)
    }
  }

  const resetForm = () => {
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('login with', username, password)

    try {
      const loginUser = await loginServise.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(loginUser)
      )
      blogService.setToken(loginUser.token)
      setUser(loginUser)
      setUsername('')
      setPassword('')
    } catch (error) {
      setError('wrong credentials')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log(username, 'logging out')

    try {
      window.localStorage.removeItem('loggedUser')
      setUser(null)
    } catch (error) {
      setError('Cant logout :D')
    }
  }

  const handleTitleChange = (event) => {
    // console.log(event.target.value);
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    // console.log(event.target.value);
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    // console.log(event.target.value);
    setNewUrl(event.target.value)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to App</h2>
      <form onSubmit={handleLogin}>
      <div>
        username
          <input
            type="text"
            value={username}
            name= "Username"
            onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
        password
          <input
            type="password"
            value={password}
            name= "Password"
            onChange={({ target }) => setPassword(target.value)}
          />
      </div>
      <button type='submit'>login</button>
     </form>
     </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={error}/>
      <User key={user.id} username={user.username} handleLogout={handleLogout}></User>
      <BlogForm
        addBlog={addBlog}
        newTitle={newTitle}
        newAuthor={newAuthor}
        newUrl={newUrl}
        handleTitleChange={handleTitleChange}
        handleAuthorChange={handleAuthorChange}
        handleUrlChange={handleUrlChange}
      />
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>

  )
}

export default App
