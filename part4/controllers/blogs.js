const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const result = await Blog.find({}).populate('user', { blogs: 0 })
  return response.json(result)
})

blogsRouter.post('/', middleware.userIdExtractor, async (request, response) => {
  const user = await User.findById(request.userId)
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  return response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userIdExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog && blog.user.toString() === request.userId) {
    await Blog.findByIdAndRemove(request.params.id)
  } else if (blog && blog.user.toString() !== request.userId) {
    return response.status(401).json({ error: 'token invalid' })
  }

  return response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  return response.json(result).end()
})

module.exports = blogsRouter
