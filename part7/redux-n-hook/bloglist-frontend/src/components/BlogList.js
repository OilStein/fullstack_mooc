import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createNotification } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

import Blog from './Blog'
import Togglable from './Togglable'
import NewBlog from './NewBlog'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.login)

  const blogFormRef = React.createRef()

  const byLikes = (b1, b2) => b2.likes - b1.likes

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

  return (
    <div>
      <h2>blogs</h2>

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

export default BlogList
