/* eslint-disable react/prop-types */
import React from 'react'

const Notification = ({ notification }) => {
  if (notification !== '') {
    return (
    <div>
       A new anecdote {notification} created!
    </div>
    )
  }
  return null
}

export default Notification
