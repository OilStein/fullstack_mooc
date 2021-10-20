/* eslint-disable react/prop-types */
import React from 'react'
import { useParams } from 'react-router'

const AnecdoteInfo = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => a.id === id)

  console.log(id)
  console.log(anecdote)

  return (
    <div>
      <h1>{anecdote.content} by {anecdote.author}</h1>
      <p>
        Has {anecdote.votes} votes
      </p>
      <p>
        For more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  )
}

export default AnecdoteInfo
