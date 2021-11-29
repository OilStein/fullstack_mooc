import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR} from '../queries';

const Authors = ({show}) => {
  const authors = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS}]
  })

  const submit = async (event) => {
    event.preventDefault()
    try {
      //console.log(name);
      await editAuthor({variables: {name, year: parseInt(year)}})
    } catch (error) {
      console.error(error);
    }

    setName('')
    setYear('')
  }

  if (!show)  return null
  if(authors.loading) return <div>Loading</div>
  if(authors.error) return <div>Error :(</div>
    
  return (
    <div>
      <h2>authors</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
        </thead>
        <tbody>    
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
         <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name:
          <select onChange={({target}) => setName(target.value)} value={name}>
            {authors.data.allAuthors.map(author => {
              return <option key={author.name} value={author.name}>{author.name}</option>
            })}
          </select>
        </div>
        <div>
          birthdate: 
          <input value={year} onChange={({target}) => setYear(target.value)}></input>
        </div>
        <button type='submit' >update author</button>
      </form>
      </div>
     

    </div>
  )
}

export default Authors