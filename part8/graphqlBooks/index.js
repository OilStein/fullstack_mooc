require('dotenv').config()
const { ApolloServer, gql, AuthenticationError, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const jwt = require('jsonwebtoken')

// salainen
const JWT_SECRET = process.env.SECRET

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
    },

    me: (root, args, context) => {
      context.currentUser
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
    addBook: async (root, args, context) => {
      if(!context.currentUser) {
        throw new AuthenticationError('Please log in!')
      }

      let author = await Author.findOne({name: args.author})

      if(!author) {
        const newAuthor = new Author({name: args.author})
        await newAuthor.save()
        author = newAuthor
      }

      const book = new Book({...args, author: author})
      // console.log(book);
      try {
        return book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invadidArgs: args
        })
      }
    },
    editAuthor: async (root,args) => {
      // console.log(args);

      if(!context.currentUser) {
        throw new AuthenticationError('Please log in!')
      }
      const edit = await Author.findOneAndUpdate({name: args.name}, {$set: {born: args.setBornTo}})
      // console.log(edit);
      return edit ? edit : null
    },

    createUser: async (root, args) => {
      const user = new User({username: args.username, favoriteGenre: args.favoriteGenre})
      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invadidArgs: args
        })
      }

    },

    login: async (root, args) => {
      const user = await User.findOne({username: args.username})
    }

  }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization : null
    if( auth && auth.toLowerCase().startsWith('bearer ')) {
      const decoded = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decoded.id).populate('friends')
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})