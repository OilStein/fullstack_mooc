let timer

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFICATION': {
      return action.data
    }
    case 'HIDE': {
      return ''
    }
    default:
      return state
  }
}

export const showNotification = (notification, time) => {
  const s = time * 1000
  clearTimeout(timer)
  // console.log('noti ', notification)

  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      data: notification
    })
    timer = setTimeout(() => {
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
