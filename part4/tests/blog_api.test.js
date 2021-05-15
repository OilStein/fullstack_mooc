const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

const User = require('../models/user')
const Blog = require('../models/blog')

describe('when initng blogs', () => {
  let token = ''
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'admin', passwordHash })
    await user.save()

    const result = await api
      .post('/api/login')
      .send({
        username: 'admin',
        password: 'sekret'
      })

    token = result.body.token
  })

  test('a blog post can be added ', async () => {
    const newBlog = {
      title: 'Added new post',
      url: '/newpost',
      likes: 743
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain('Added new post')
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  describe('doing things to one blog', () => {
    test('blog without title is not added', async () => {
      const newBlog = {
        likes: 23
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('a blog can be deleted', async () => {
      const blogAtStart = await helper.blogsInDb()
      const blogToDelete = blogAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
      )

      const titles = blogsAtEnd.map(r => r.title)

      expect(titles).not.toContain(blogToDelete.title)
    })

    test('identify blog id', async () => {
      const getBlogs = await helper.blogsInDb()
      const blogToView = getBlogs[0]
      const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
      // console.log(processedBlogToView)
      expect(processedBlogToView.id).toBeDefined()
    })
  })

  test('Content of the blog can be viewed', async () => {
    const blogAtStart = await helper.blogsInDb()
    const blogToView = blogAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('likes default 0', async () => {
    const newBlog = {
      title: 'likes to zero',
      url: '/likesZero'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd.pop().likes).toBe(0)
  })

  test('title or url missing', async () => {
    const newBlog = {
      title: 'url missing',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const newBlog2 = {
      url: '/missingTitle',
      likes: 43242
    }

    await api
      .post('/api/blogs')
      .send(newBlog2)
      .expect(400)
  })

  test('update object', async () => {
    const blogAtStart = await helper.blogsInDb()
    const blogToUpdate = blogAtStart[0]
    const update = {
      likes: 421
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(update)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(421)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
