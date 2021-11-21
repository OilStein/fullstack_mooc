const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'MESSAGE':
      return action.data
    case 'RESET':
      return null
    default:
      return state
  }
}

let timeout

export const createNotification = (message, type = 'success') => {
  return async dispatch => {
    await dispatch({
      data: { message, type },
      type: 'MESSAGE'
    })

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
