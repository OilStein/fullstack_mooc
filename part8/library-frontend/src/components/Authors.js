import React from 'react'
import { useQuery } from '@apollo/client';
import { ALL_AUTHORS} from '../queries';

const Authors = ({show}) => {
  const authors = useQuery(ALL_AUTHORS)

  if (!show)  return null
  if(authors.loading) return <div>Loading</div>
  if(authors.error) return <div>Error :(</div>

  

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Authors