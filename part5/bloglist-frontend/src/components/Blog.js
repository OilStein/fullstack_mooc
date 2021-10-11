
import React, { useState } from 'react'
// import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, giveLike, user, notify, deleteBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const [buttonValue, setButtonValue] = useState('show')

  // console.log(blog)
  const showInfo = { display: blogVisible ? '' : 'none' }

  const toggleButton = () => {
    if (!blogVisible) {
      setBlogVisible(true)
      setButtonValue('hide')
    } else {
      setBlogVisible(false)
      setButtonValue('show')
    }
  }

  const toggleDeleteButton = () => {
    if (user === blog.user.username) {
      return (
        <div><button onClick={deleteBlog} id={blog.id}>remove</button></div>
      )
    }
  }

  // const deleteBlog = async () => {
  //   const id = blog.id
  //   console.log(id)
  //   try {
  //     if (window.confirm(`Deleting ${blog.title}, are you sure?`)) {
  //       await blogService.remove(id)
  //       notify(`Deleted ${blog.title}`)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     notify('Failed', 'error')
  //   }
  // }

  return (
    <div className="blogStyle">
    {blog.title} -- {blog.author} <button onClick={toggleButton}>{buttonValue}</button>
    <div style={showInfo}>
      <div>{blog.url}</div>
      <div>{blog.likes} <button onClick={giveLike} id={blog.id}>like</button></div>
      <div>{blog.user.name}</div>
      {toggleDeleteButton()}
    </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  giveLike: PropTypes.func,
  user: PropTypes.string.isRequired,
  notify: PropTypes.func,
  deleteBlog: PropTypes.func
}

export default Blog
