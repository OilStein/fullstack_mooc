const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Give a password argument!');
    process.exit(1)
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@fullstackmooc.imlxg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: "Artoliini Kana",
    number: "92992"
})

person.save().then(res => {
    console.log('note saved');
    mongoose.connection.close()
})