import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
// import anecdoteService from '../services/adecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    // Notification
    dispatch(showNotification(`You created anecdote: ${content}`, 5))
  }

  return (
        <div>
          <h2>Create Anecdote!</h2>
          <form onSubmit={addAnecdote}>
            <input name='anecdote'></input>
            <button type='submit'>submit</button>
          </form>
        </div>
  )
}

export default AnecdoteForm
