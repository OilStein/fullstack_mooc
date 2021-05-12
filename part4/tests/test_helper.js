const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Test 1',
    author: 'Niko',
    url: '/test1',
    likes: 2
  },
  {
    title: 'Test 2',
    author: 'Pete',
    url: '/test2',
    likes: 62
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ author: 'Ville', url: '/nonExisting' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}
