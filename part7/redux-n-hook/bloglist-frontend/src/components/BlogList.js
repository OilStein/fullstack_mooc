import React from 'react'
import { useSelector } from 'react-redux'

import Togglable from './Togglable'
import NewBlog from './NewBlog'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  const blogFormRef = React.createRef()

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div className='container max-w-2xl'>
      <h2 className='text-2xl font-bold' >Blogs</h2>

      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog/>
      </Togglable>
      <ul>
        {blogs.sort(byLikes).map(blog =>
        <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}</li>
        )}
      </ul>

    </div>

  )
}

export default BlogList
