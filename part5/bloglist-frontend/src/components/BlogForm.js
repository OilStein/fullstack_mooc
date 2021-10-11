import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

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

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    resetForm()
  }

  const resetForm = () => {
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }
  // console.log(props)
  return (
    <div className='formDiv'>
      <h2>create a blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input id='title' value={newTitle} onChange={handleTitleChange} ></input>
        </div>
        <div>
          author: <input id='author' value={newAuthor} onChange={handleAuthorChange}></input>
        </div>
        <div>
          url: <input id='url' value={newUrl} onChange={handleUrlChange}></input>
        </div>
        <div>
          <button id='create-button' type='submit'>create</button>
        </div>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
