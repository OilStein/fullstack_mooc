import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createNotification } from '../reducers/notificationReducer'
import { commentBlog, likeBlog, removeBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router'

const Blog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.login)

  if (!blogs) {
    return null
  }

  const { id } = useParams()

  const blog = blogs.find(b => b.id === id)
  const [comment, setComment] = useState('')

  const handleLike = async (blog) => {
    try {
      dispatch(likeBlog(blog))
      dispatch(createNotification(`${blog.title} liked`))
    } catch (error) {
      dispatch(createNotification('Something went wrong with liking', 'error'))
    }
  }

  const handleRemove = (blog) => {
    const id = blog.id
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      dispatch(removeBlog(id))
    }
  }

  const handleComment = async (e) => {
    e.preventDefault()
    try {
      dispatch(commentBlog(blog.id, comment))
      setComment('')
    } catch (error) {
      dispatch(createNotification('Something went wrong with commenting', 'error'))
    }
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

        <div>
          <h3>Comments</h3>

          <form onSubmit={handleComment}>
            <input id='comment' value={comment} onChange={({ target }) => setComment(target.value) } placeholder='Write a comment..' ></input>
            <button type='submit'>Comment</button>
          </form>

          <ul>
            {blog.comments && blog.comments.map(comment =>
              <li key={comment}>{comment}</li>
            )}
          </ul>

        </div>
    </div>
  )
}

export default Blog
