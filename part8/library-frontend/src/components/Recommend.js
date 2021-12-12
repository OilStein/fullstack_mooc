import { useLazyQuery } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { ALL_BOOKS } from "../queries"

const Recommend = ({show, data, user}) => {

  const [rBooks, result] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState(data)

  useEffect(() => {
    rBooks({variables: {genre: user.favoriteGenre}})
    if(result.data) {
      setBooks(result.data.allBooks)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  
  if(!show || !user) return null

  return (
    <div>
      <h2>Recommened books for you</h2>
      <p>Your favorite genre is <b>{user.favoriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
