require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.json())

app.use(cors())

app.use(express.static('build'))
// app.use(morgan('tiny', (req, res) => {
//   return res.statusCode
// }))

morgan.token('post', (req, _res) => JSON.stringify(req.body))

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :post')
)

app.get('/info', (_req, res, _next) => {
  Person.countDocuments({}).then((c) => {
    const date = new Date()
    res.send(
      `<div> Phonebook has info for ${c} people </div>`, `<div>${date}</div>`
    )
  })
})

app.get('/api/persons', (_req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then((person) => {
    res.json(person)
  }).catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    }).catch((e) => next(e))
})

// const getRandomId = (min, max) => {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

// console.log(getRandomId(1, 100000));

app.post('/api/persons', (req, res, next) => {
  const { body } = req

  // console.log('body content',body);

  if (body.name === undefined && body.number === undefined) {
    return res.status(400).json({
      error: 'Name or number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then((savedPerson) => {
    res.json(savedPerson.toJSON())
  }).catch((e) => next(e))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { body } = req
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, {
    new: true
  }).then((updatePerson) => {
    res.json(updatePerson)
  }).catch((e) => next(e))
})

const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`Server on ${PORT}`)
})

const unknownEndpoint = (_req, res) => {
  res.status(404).send({
    error: 'unknown endpoint'
  })
}

app.use(unknownEndpoint)

const errorHandler = (error, _req, res, next) => {
  console.error(error.message)
  if (error.name === 'castError') {
    return res.status(400).send({
      error: 'malformated id'
    })
  } if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: error.message
    })
  } if (error.name === 'ValidatorError') {
    return res.status(409).json({
      error: error.message
    })
  }
  next(error)
}

app.use(errorHandler)
