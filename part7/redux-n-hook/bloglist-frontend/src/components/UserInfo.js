/* eslint-disable react/prop-types */
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

const UserInfo = () => {
  const { id } = useParams()
  const users = useSelector(state => state.users)
  const user = users.find(u => u.id === id)
  const blogs = user.blogs
  // console.log(user)
  // console.log(blogs)
  if (!user) {
    return null
  }

  return (
  <div className='container mx-auto pt-2 mt-2'>
    <h2 className='font-bold text-4xl'>{user.name}</h2>
    <h4 className='text-2xl font-semibold mt-2'>Added blogs</h4>
    <div className='flex flex-wrap justify-start gap-3'>
      {blogs.map(blog =>
        <div key={blog.id} className='my-1 flex p-2 rounded-md w-max border-indigo-500 border-2'>
          <Link className='text-blue-400 hover:text-blue-600' to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
      )}
    </div>
  </div>
  )
}

export default UserInfo
