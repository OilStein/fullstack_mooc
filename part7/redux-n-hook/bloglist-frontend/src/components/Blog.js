import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createNotification } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router'

const Blog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.login)
  const { id } = useParams()
  const blog = blogs.find(b => b.id === id)

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

  if (!blogs) {
    return null
  }

  return (
    <div>
      <div>
        <h2><i>{blog.title}</i> by {blog.author}</h2>
      </div>

        <div>
          <div><a href={blog.url}>{blog.url}</a></div>
          <div>likes {blog.likes}
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          <div>Added by {blog.user.name}</div>
          {blog.user.name === user.name ? <button id={blog.id} onClick={() => handleRemove(blog)}>remove</button> : <></>}
        </div>

    </div>
  )
}

export default Blog
