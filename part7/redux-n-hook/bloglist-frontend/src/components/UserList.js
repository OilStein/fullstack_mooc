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
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map(user =>
          <tr key={user.username}>
            <td><Link to={`/users/${user.id}`} id={user.id}>{user.name}</Link></td>
            <td>{user.blogs.length}</td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
