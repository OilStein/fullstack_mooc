import anecdoteService from '../services/adecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT': {
      // console.log('actiondata')
      // console.log(action.data)
      return action.data
    }
    case 'NEW_ANECDOTE': {
      return [...state, action.data]
    }
    // Works
    case 'VOTE': {
      const id = action.data.id
      return state.map(anec => anec.id !== id ? anec : action.data)
    }
    default:
      return state
  }
}

export const initAnecdotes = () => {
  // console.log('initAnecdotes')
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    // console.log(anecdotes)
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  // console.log(content)
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    // console.log('new A ', newAnecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const giveVote = (anecdote) => {
  // console.log('giveVote', anecdote)
  return async dispatch => {
    const update = { ...anecdote, votes: anecdote.votes + 1 }
    const vote = await anecdoteService.voteAnecdote(update)
    // console.log(vote)
    dispatch({
      type: 'VOTE',
      data: vote
    })
  }
}

export default anecdoteReducer
