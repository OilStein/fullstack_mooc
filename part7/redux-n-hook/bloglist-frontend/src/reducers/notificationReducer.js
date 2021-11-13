const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'MESSAGE':
      return action.notification
    case 'RESET':
      return null
    default:
      return state
  }
}

const setNotification = (notification) => {
  return {
    type: 'MESSAGE',
    notification
  }
}

let timeout

export const createNotification = (message, type = 'success') => {
  return async dispatch => {
    await dispatch(setNotification({ message, type }))

    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      dispatch({
        type: 'RESET'
      })
    }, 3 * 1000)// 3 seconds
  }
}

export default notificationReducer
