const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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

  const user = await User.findById(body.userId)

  if (body.title === undefined || body.url === undefined) {
    return res.status(400).json({
      error: 'title or url missing'
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

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
