const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Give a password argument!')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@fullstackmooc.imlxg.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv[3] != null && process.argv[4] != null) {
  const paramName = process.argv[3]
  const paramNumber = process.argv[4]
  const person = new Person({
    name: paramName,
    number: paramNumber
  })
  person.save().then(res => {
    console.log(`added ${paramName} number ${paramNumber} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}
