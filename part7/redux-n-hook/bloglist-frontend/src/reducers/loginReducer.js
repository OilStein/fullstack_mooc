import blogs from '../services/blogs'
import loginService from '../services/login'

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.user
    default:
      return state
  }
}

export const setUserState = (user) => {
  blogs.setToken(user.token)
  return {
    type: 'LOGIN',
    user
  }
}

export const loginUser = (user) => {
  return async dispatch => {
    const logged = await loginService.login(user)
    console.log('logged ' + logged.token)
    window.localStorage.setItem('loggedInUser', JSON.stringify(logged))
    blogs.setToken(logged.token)
    console.log(logged)
    dispatch({
      user: logged,
      type: 'LOGIN'
    })
  }
}

export const logoutUser = () => {
  window.localStorage.removeItem('loggedInUser')
  return {
    user: null,
    type: 'SET_USER'
  }
}

export default loginReducer
