import {gql} from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks (genre: $genre) {
      title,
      author {
        name
      }
      published
      genres
    }
}
`

export const ADD_BOOK = gql`
  mutation newBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook (
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $year: Int!) {
    editAuthor ( name: $name, setBornTo: $year) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login ( username: $username, password: $password) {
      value
    }
  }
`

export const USER = gql`
  query me {
    me {
      username
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      author {
        name
        born
      }
      genres
    }
  }
`