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
  <div>
    <h2>{user.name}</h2>
    <h4>Added blogs</h4>
    <ul>
      {blogs.map(blog =>
        <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
      )}
    </ul>
  </div>
  )
}

export default UserInfo
