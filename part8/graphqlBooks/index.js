require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')

const Author = require('./models/author')
const Book = require('./models/book')

const url = process.env.MONGODB_URI

console.log('Connecting to MONGODB')
mongoose.connect(url)
  .then(() => {
    console.log('Connected');
  })
  .catch((error) => {
    console.log('Error in connecting to MongoDB', error.message);
  })


const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type Token {
  value: String!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!,
      published: Int!,
      author: String!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocumemts(),

    authorCount: () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      if(args.genre){
        return await Book.find({genres: { $in: [args.genre]}})
      }
      return await Book.find({})
      
    },

    allAuthors: async () => {
      return await Author.find({})
    }
  },

  Book: {
    author: async (root) => {
      const author = await Author.findOne({_id: root.author})
      return {
        name: author.name,
        born: author.born
      }
    }
  },

  Author: {
    bookCount: async (root) => {
      return await Book.find({author: root._id}).countDocuments()
    } 
  },

  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({name: args.author})

      if(!author) {
        const newAuthor = new Author({name: args.author})
        await newAuthor.save()
        author = newAuthor
      }

      const book = new Book({...args, author: author})
      console.log(book);
      try {
        return book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invadidArgs: args
        })
      }
    },
    editAuthor: async (root,args) => {
      console.log(args);
      const edit = await Author.findOneAndUpdate({name: args.name}, {$set: {born: args.setBornTo}})
      console.log(edit);
      return edit ? edit : null
    }
  }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})