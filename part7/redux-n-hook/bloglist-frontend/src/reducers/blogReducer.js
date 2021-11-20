import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'CREATE':
      return [...state, action.data]
    case 'UPDATE': {
      return action.data
    }
    case 'REMOVE': {
      return state.filter(s => s.id !== action.data.id)
    }
    case 'COMMENT': {
      return action.data
    }

    default:
      return state
  }
}

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      data: blogs,
      type: 'INIT'
    })
  }
}

export const createBlog = (newBlog) => {
  return async dispatch => {
    const blog = await blogService.create(newBlog)
    dispatch({
      data: blog,
      type: 'CREATE'
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const update = { ...blog, likes: blog.likes + 1 }
    const data = await blogService.like(update)
    dispatch({
      data: data,
      type: 'UPDATE'
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      data: id,
      type: 'REMOVE'
    })
  }
}

export const commentBlog = (id, comment) => {
  return async dispatch => {
    const c = await blogService.comment(id, comment)
    dispatch({
      data: c,
      type: 'COMMENT'
    })
  }
}

export default blogReducer
