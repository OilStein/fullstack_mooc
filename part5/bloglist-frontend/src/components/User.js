
import React from 'react'
import PropTypes from 'prop-types'

const User = ({ username, handleLogout }) => {
  return (
     <div>
        {username} logged <button onClick={handleLogout}>logout</button>
    </div>
  )
}

User.propTypes = {
  username: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
}
export default User
