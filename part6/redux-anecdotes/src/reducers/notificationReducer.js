const notificationsAtStart = []

const notificationReducer = (state = notificationsAtStart, action) => {
  switch (action.type) {
    case 'NOTIFICATION': {
      return [...notificationsAtStart, action.data]
    }
    case 'HIDE': {
      return notificationsAtStart
    }
    default:
      return state
  }
}

export const showNotification = (notification) => {
  console.log(notification)
  return {
    type: 'NOTIFICATION',
    data: notification
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE',
    data: {}
  }
}

export default notificationReducer
