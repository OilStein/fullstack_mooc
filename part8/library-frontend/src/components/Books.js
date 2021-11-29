
import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { ALL_BOOKS} from '../queries';

const Books = ({show}) => {
  const [search, setSearch] = useState("")
  const data = useQuery(ALL_BOOKS, {
    variables: {genre: search}
  })
  // TODO get all genres

  if (!show) return null
  if(data.loading) return <div>Loading</div>
  if(data.error) return <div>Error :(</div>
  
  const books = data.data.allBooks

  const genres = [...new Set(books.map(b => b.genres).flat())]  

  return (
    <div>
      <h2>books</h2>

      <div>
        
          <div>
            <select onChange={({target}) => setSearch(target.value)} value={search}>
              <option value={""} >all</option>
              {genres.map(genre => {
                return <option key={genre} value={genre}>{genre}</option>
              })}
            </select>
          </div>
       
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
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

export default Books