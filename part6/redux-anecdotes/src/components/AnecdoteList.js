import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { giveVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { cmp } from '../utils/cmp'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      {anecdote.content} <br/>
      has {anecdote.votes} <button onClick={handleClick}>vote</button>
    </li>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter).toString()

  const anecdotes = useSelector(({ anecdotes }) => {
    if (filter !== '') {
      return anecdotes.filter(el => el.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
    }
    return anecdotes
  })

  // Sort by votes then by content

  anecdotes.sort((a, b) => { return cmp(b.votes, a.votes) || cmp(a.content, b.content) })

  return (
      <ul>
        {anecdotes.map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => {
              dispatch(giveVote(anecdote))
              dispatch(showNotification(`You voted: ${anecdote.content}`, 3))
            }}
          />
        )}
      </ul>
  )
}

Anecdote.propTypes = {
  anecdote: PropTypes.any,
  handleClick: PropTypes.any
}

export default AnecdoteList
