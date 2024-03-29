import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  // console.log(notification)
  if (notification === null) {
    return null
  }

  return (
    <div className={notification.type}>
        {notification.message}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.object
}

export default Notification
