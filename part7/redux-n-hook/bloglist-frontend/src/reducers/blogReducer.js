import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data.sort((a, b) => b.likes - a.likes)
    case 'CREATE':
      return [...state, action.data]
    case 'UPDATE': {
      const blog = action.data
      return state.map(a => a.id === blog.id ? blog : a).sort((a, b) => b.likes - a.likes)
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
    console.log(blog)
    dispatch({
      data: blog,
      type: 'CREATE'
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const update = { ...blog, likes: blog.likes + 1 }
    console.log('update: ' + update.id)
    const data = await blogService.like(update)
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
      data: id,
      type: 'REMOVE'
    })
  }
}

export default blogReducer
