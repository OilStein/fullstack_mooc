const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')
const User = require('../models/user')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog.toJSON())
  } else {
    res.status(404).end()
  }
})

blogRouter.delete('/:id', userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  // console.log(user.id, 'user info', typeof user.id)
  // console.log(blog.user, 'blog user', typeof blog.user)

  if (blog.user.toString() === user.id) {
    await Blog.findByIdAndDelete(req.params.id)
  } else {
    return res.status(400).json({
      error: 'wrong user'
    })
  }

  res.status(204).end()
})

blogRouter.post('/', userExtractor, async (req, res) => {
  const blog = new Blog(req.body)

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!blog.title || !blog.url) {
    return res.status(400).json({
      error: 'title or url missing'
    })
  }

  blog.user = user

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog.toJSON)
})

blogRouter.put('/:id', async (req, res) => {
  const body = req.body
  const update = await Blog.findByIdAndUpdate(req.params.id, body, { new: true })
  res.json(update)
})

module.exports = blogRouter
