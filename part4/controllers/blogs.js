const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs)
  })
})

blogRouter.post('/', (req, res, next) => {
  const body = new Blog(req.body)

  const blogpost = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  blogpost.save().then(r => {
    res.status(201).json(r)
  })
    .catch(e => next(e))
})

module.exports = blogRouter
