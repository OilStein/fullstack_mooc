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
    <div className='container mx-auto'>
      <h2 className='text-4xl font-bold' >Blogs</h2>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog/>
      </Togglable>
      <div className='flex flex-wrap flex-col gap-1 md:flex-row pt-4 mt-2'>
        {blogs.sort(byLikes).map(blog =>
        <Link key={blog.id} to={`/blogs/${blog.id}`}>
          <div className='px-2 border-2 text-center rounded-md hover:bg-indigo-300'>
            {blog.title}<i> by {blog.author} </i>
          </div>
        </Link>
        )}
      </div>

    </div>

  )
}

export default BlogList
