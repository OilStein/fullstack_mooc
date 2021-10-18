import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseURL)
  // console.log(response)
  return response.data
}
const createAnecdote = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseURL, object)
  return response.data
}

const voteAnecdote = async (object) => {
  // console.log('axios ', object)
  const response = await axios.put(`${baseURL}/${object.id}`, object)
  return response.data
}

export default { getAll, createAnecdote, voteAnecdote }
