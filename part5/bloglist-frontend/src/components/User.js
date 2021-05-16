/* eslint-disable react/prop-types */
import React from 'react'

const User = ({ username, handleLogout }) => {
  return (
     <div>
        {username} logged <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default User
