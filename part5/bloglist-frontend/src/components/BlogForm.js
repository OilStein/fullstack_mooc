/* eslint-disable react/prop-types */
import React from 'react'

const BlogForm = (props) => {
  // console.log(props)
  return (
    <div>
      <h2>create blog</h2>
      <form onSubmit={props.addBlog}>
        <div>
          title: <input value={props.newTitle} onChange={props.handleTitleChange} ></input>
        </div>
        <div>
          author: <input value={props.newAuthor} onChange={props.handleAuthorChange}></input>
        </div>
        <div>
          url: <input value={props.newUrl} onChange={props.handleUrlChange}></input>
        </div>
        <div>
          <button type='submit'>create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
