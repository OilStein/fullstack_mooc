/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'

const Anecdote = ({ id, content }) => {
  console.log('id: ', id)
  return (
    <li>
      <Link to={`anecdotes/${id}`}>{content}</Link>
    </li>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <Anecdote key={anecdote.id} id={anecdote.id} content={anecdote.content}/>)}
    </ul>
  </div>
)

export default AnecdoteList
