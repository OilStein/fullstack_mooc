const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case 'NOTIFICATION': {
      return [...state, action.data]
    }
    case 'HIDE': {
      return []
    }
    default:
      return state
  }
}

export const showNotification = (notification, time) => {
  const s = time * 1000
  console.log('noti ', notification)
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      data: notification
    })
    setTimeout(() => {
      dispatch(hideNotification())
    }, s)
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE',
    data: {}
  }
}

export default notificationReducer
