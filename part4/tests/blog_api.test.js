const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const user = await helper.registerUserTest()
  await Blog.deleteMany({})
  const userBlogs = helper.initialBlogs.map(b => ({ ...b, user: user.id }))
  await Blog.insertMany(userBlogs)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('all blogs contain id property', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    for (const blog of blogs) {
      expect(blog.id).toBeDefined()
    }
  })
})

describe('save a new blog', () => {
  test('verify that there is a new blog saved', async () => {
    const responseLogin = await api
      .post('/api/login')
      .send(helper.userTest)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const newBlog = {
      title: 'Julia: A New Age of Data Science',
      author: 'Abid Ali Awan',
      url: 'https://towardsdatascience.com/julia-for-data-science-a-new-age-data-science-bf0747a94851',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${responseLogin.body.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs.length).toBe(helper.initialBlogs.length + 1)
  })

  test('get 401 code when create a blog wihtout send token', async () => {
    const newBlog = {
      title: 'Julia: A New Age of Data Science',
      author: 'Abid Ali Awan',
      url: 'https://towardsdatascience.com/julia-for-data-science-a-new-age-data-science-bf0747a94851',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  test('verify likes default value', async () => {
    const responseLogin = await api
      .post('/api/login')
      .send(helper.userTest)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const newBlog = {
      title: 'Parallel programming in Java',
      author: 'Peter Lee',
      url: 'https://medium.com/@peterlee2068/concurrency-and-parallelism-in-java-f625bc9b0ca4'
    }

    const response = await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${responseLogin.body.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const id = response.body.id
    const blogs = await helper.blogsInDb()
    const blogSaved = blogs.find(b => b.id === id)
    expect(blogSaved.likes).toBe(0)
  })

  test('verify get 400 bad request when title or url are missing', async () => {
    const responseLogin = await api
      .post('/api/login')
      .send(helper.userTest)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const newBlog = {
      url: 'https://medium.com/@knoldus/apache-camel-the-beginners-guide-5fc25f1461d6',
      likes: 8
    }

    await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${responseLogin.body.token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('delete a blog', () => {
  test('verify the number of blogs after to delete one', async () => {
    const responseLogin = await api
      .post('/api/login')
      .send(helper.userTest)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('authorization', `Bearer ${responseLogin.body.token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const ids = blogsAtEnd.map(b => b.id)

    expect(ids).not.toContain(blogToDelete.id)
  })
})

describe('update a blog', () => {
  test('verify likes value update', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const blog = {
      likes: 3
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const blogUpdated = blogsAtEnd.find(b => b.id === blogToUpdate.id)
    expect(blogUpdated.likes).toBe(blog.likes)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
