const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  published: {
    type: Number
  },
  genres: [
    {type: String}
  ]
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('Book', schema)