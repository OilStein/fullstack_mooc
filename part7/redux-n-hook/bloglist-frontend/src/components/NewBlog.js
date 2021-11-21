import React, { useState } from 'react'

import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'

const NewBlog = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleNewBlog = (event) => {
    event.preventDefault()
    try {
      dispatch(createBlog({ title, author, url }))
      dispatch(createNotification(`Created a new blog ${title} by ${author}`))
    } catch (error) {
      dispatch(createNotification('Creating a blog failed successfully', 'error'))
    }
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={handleNewBlog}>
        <div className='mb-2'>
          <label className='form-label'>Author</label>
          <input
            type='text'
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            className='form-input'
          />
        </div>
        <div className='mb-2'>
          <label className='form-label'>Title</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            className='form-input'
          />
        </div>
        <div className='mb-2'>
          <label className='form-label'>Url</label>
          <input
            type='text'
            id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            className='form-input'
          />
        </div>
        <button id="create" className='form-button'>
          Create
        </button>
      </form>
    </div>
  )
}

NewBlog.propTypes = {
  createBlog: PropTypes.func
}

export default NewBlog
