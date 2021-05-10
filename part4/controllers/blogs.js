const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', (req, res, next) => {
  const body = new Blog(req.body)

  if (body.title === undefined) {
    return res.status(400).json({
      error: 'title missing'
    })
  }

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
