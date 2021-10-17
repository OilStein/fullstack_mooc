import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { hideNotification, showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    console.log(`addAnecdote ${content}`)
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(showNotification('You created anecdote: ' + content))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
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
