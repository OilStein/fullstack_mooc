const blogRouter = require('express').Router()
const Blog = require('../models/blog')
// const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

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

  const user = req.user

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
  const body = req.body

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = req.user

  if (body.title === undefined || body.url === undefined) {
    return res.status(400).json({
      error: 'title or url missing'
    })
  }

  const blog = new Blog({
    title: body.title,
    author: user.name,
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
