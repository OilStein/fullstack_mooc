import React from 'react'

import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification) {
    if (notification.type === 'success') {
      return (
    <div className="flex bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700" role='alert'>
      <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
      <div>
        {notification.message}
      </div>
    </div>
      )
    }

    if (notification.type === 'error') {
      return (
    <div className="flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700" role='alert'>
      <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
      <div>
        {notification.message}
      </div>
    </div>
      )
    }
  }

  return null
}

export default Notification
