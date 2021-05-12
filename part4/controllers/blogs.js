const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog.toJSON())
  } else {
    res.status(404).end()
  }
})

blogRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogRouter.post('/', async (req, res) => {
  const body = req.body

  if (body.title === undefined || body.url === undefined) {
    return res.status(400).json({
      error: 'title missing'
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  const savedBlog = await blog.save()
  res.json(savedBlog.toJSON)
})

blogRouter.put('/:id', async (req, res) => {
  const body = req.body
  const updates = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const update = await Blog.findByIdAndUpdate(req.params.id, updates, { new: true })
  res.json(update)
})

module.exports = blogRouter
