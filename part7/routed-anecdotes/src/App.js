/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Footer from './components/Footer'
import About from './components/About'
import Menu from './components/Menu'
import CreateNew from './components/CreateNew'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteInfo from './components/AnecdoteInfo'
import Notification from './components/Notification'

const App = () => {
  const [notification, setNotification] = useState('')
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  console.log(anecdotes)

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const notify = ({ content }) => {
    // console.log('nofify ' + content)
    setNotification(content)
    setTimeout(() => setNotification(''), 10000)
  }
  /*
  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  } */

  return (
    <Router>
      <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification}/>
      <Switch>
        <Route path={'/anecdotes/:id'}>
          <AnecdoteInfo anecdotes={anecdotes}/>
        </Route>
        <Route path={'/create'}>
          <CreateNew addNew={addNew} setNotification={notify} />
        </Route>
        <Route path={'/about'}>
          <About />
        </Route>
        <Route path={'/'}>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>

      <Footer />
    </div>
    </Router>

  )
}

export default App
