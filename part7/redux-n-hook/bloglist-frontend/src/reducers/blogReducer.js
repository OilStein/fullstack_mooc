import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data.sort((a, b) => b.likes - a.likes)
    case 'CREATE':
      return [...state, action.data]
    case 'UPDATE': {
      const sf = state.filter(s => s.id !== action.data.id)
      const ns = [...sf, action.data]
      return [...ns, action.data]
    }
    case 'REMOVE': {
      return state.filter(s => s.id !== action.data.id)
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

export const updateBlog = (id, blog) => {
  return async dispatch => {
    const data = await blogService.update(id, blog)
    console.log(data)
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
      type: 'REMOVE'
    })
  }
}

export default blogReducer
