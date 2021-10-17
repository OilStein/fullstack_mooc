import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { giveVote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

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
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter).toString()

  console.log(filter)
  // Sort by votes then by content
  anecdotes.sort((a, b) => { return cmp(b.votes, a.votes) || cmp(a.content, b.content) })

  if (filter.length > 0) {
    const filtered = anecdotes.filter(el => el.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
    console.log(filtered)
    return (
      <ul>
        {filtered.map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => {
              dispatch(giveVote(anecdote.id))
              dispatch(showNotification('You voted: ' + anecdote.content))
              setTimeout(() => {
                dispatch(hideNotification())
              }, 5000)
            }}
          />
        )}
      </ul>
    )
  }

  return (
      <ul>
        {anecdotes.map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => {
              dispatch(giveVote(anecdote.id))
              dispatch(showNotification('You voted: ' + anecdote.content))
              setTimeout(() => {
                dispatch(hideNotification())
              }, 5000)
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
