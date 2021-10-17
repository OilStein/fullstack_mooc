import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { giveVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  /*
  return (
    <li>
      {anecdote.content} <br/>
      has {anecdote.votes} <button onClick={handleClick()}>vote</button>
    </li>
  ) */
  return (
    <li>
      {anecdote.content} <br/>
      has {anecdote.votes} <button onClick={handleClick}>vote</button>
    </li>
  )
}

const cmp = (a, b) => a > b ? 1 : a < b ? -1 : 0

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)
  console.log(anecdotes)
  // Sort by votes then by content
  anecdotes.sort((a, b) => { return cmp(b.votes, a.votes) || cmp(a.content, b.content) })

  return (
      <ul>
        {anecdotes.map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => dispatch(giveVote(anecdote.id))}
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
