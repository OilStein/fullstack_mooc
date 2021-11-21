/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { getAllUsers } from '../reducers/usersReducer'

const UserList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  const users = useSelector(state => state.users)
  return (
    <div className='container mx-auto'>
      <h2 className='text-4xl font-bold'>Users</h2>
      <table className='table-auto border-collapse border border-gray-600'>
        <thead>
          <tr>
            <th className='w-3/4 border border-gray-600'>User</th>
            <th className='w-1/4 border border-gray-600'>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map(user =>
          <tr key={user.username}>
            <td className='border border-gray-600'><Link className='hover:text-blue-600 text-blue-500 text-lg' to={`/users/${user.id}`} id={user.id}>{user.name}</Link></td>
            <td className='border border-gray-600'>{user.blogs.length}</td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
