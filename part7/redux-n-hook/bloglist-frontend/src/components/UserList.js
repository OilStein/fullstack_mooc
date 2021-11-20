/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../reducers/userReducer'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td>User</td>
            <td>Blogs Created</td>
          </tr>
        </thead>

        {users.map(user =>
          <tr key={user.username}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
      </table>
    </div>
  )
}

export default UserList
