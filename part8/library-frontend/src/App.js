import React, { useState } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { USER, ALL_BOOKS, ALL_AUTHORS, BOOK_ADDED } from './queries'


const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  // Apollo queries
  const user = useQuery(USER, {pollInterval: 1000})
  const books = useQuery(ALL_BOOKS)
  const authors = useQuery(ALL_AUTHORS)
  const client = useApolloClient()

  const checkDB = (set, item) => {
    return set.map(o => o.id).includes(item.id)
  }

  const updateCache = (book) => {
    const cache = client.readQuery({ query: ALL_BOOKS })
    if(!checkDB(cache.allBooks, book)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: cache.allBooks.concat(book)}
      })
    }
  }
  
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);
      const book = subscriptionData.data.bookAdded
      notify(`new book has been added: ${book.title}`)
      updateCache(book)
    }

  })


  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  if(authors.loading || books.loading || !user){
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token 
        ? <>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={logout}>logout</button>
        </>
        :null
      }
      </div>


      {!token 
        ?<div>
          <Login setError={notify} setToken={setToken}/>
        </div>
        :null
      }

      <Notify errorMessage={errorMessage}></Notify>

      <Authors
        show={page === 'authors'}
        token={token}
        authors={authors}
      />

      <Books
        show={page === 'books'}
        data={books}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommend
        show={page === 'recommend'}
        data={books.data.allBooks}
        user={user.data.me ? user.data.me : ''}
      />

    </div>
  )
}

export default App