import blogs from '../services/blogs'
import loginService from '../services/login'
import storage from '../utils/storage'

const loggedUser = storage.loadUser()

const initialState = loggedUser || null

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    default:
      return state
  }
}

export const sUS = (user) => {
  blogs.setToken(user.token)
  return {
    data: user,
    type: 'LOGIN'
  }
}

export const loginUser = (user) => {
  return async dispatch => {
    const logged = loginService.login(user)
    window.localStorage.setItem('loggedInUser', JSON.stringify(logged))
    blogs.setToken(logged.token)
    dispatch({
      data: logged,
      type: 'LOGIN'
    })
  }
}

export const logoutUser = () => {
  window.localStorage.removeItem('loggedInUser')
  return {
    data: null,
    type: 'SET_USER'
  }
}

export default userReducer
