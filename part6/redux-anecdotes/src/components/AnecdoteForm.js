import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import propTypes from 'prop-types'
// import anecdoteService from '../services/adecdotes'

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.showNotification(`You created: ${content}`, 5)
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

AnecdoteForm.propTypes = {
  createAnecdote: propTypes.func,
  showNotification: propTypes.func
}

export default connect(null, { createAnecdote, showNotification })(AnecdoteForm)
