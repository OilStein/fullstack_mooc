import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    console.log(`addAnecdote ${content}`)
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  return (
        <div>
          <form onSubmit={addAnecdote}>
            <input name='anecdote'></input>
            <button type='submit'>submit</button>
          </form>
        </div>
  )
}

export default AnecdoteForm
