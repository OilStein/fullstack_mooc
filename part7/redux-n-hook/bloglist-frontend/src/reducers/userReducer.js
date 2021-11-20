import userService from '../services/users'

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL':
      return action.users
    default:
      return state
  }
}

export const getAllUsers = () => {
  return async dispatch => {
    const users = await userService.getUsers()
    dispatch({
      users,
      type: 'GET_ALL'
    })
  }
}

export default userReducer
