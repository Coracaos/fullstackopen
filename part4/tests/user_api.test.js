const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

describe('save a new user', () => {
  test('verify creation of a new user', async () => {
    const newUser = {
      username: 'mcardenasec',
      name: 'manuel cardenas',
      password: 'tukituki'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const users = await helper.usersInDb()
    const userIds = users.map(u => u.id.toString())
    expect(userIds).toContain(response.body.id)
  })

  test('get error when save user with invalid username', async () => {
    const newUser = {
      username: 'mc',
      name: 'manuel cardenas',
      password: 'taxitaxi'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('get error when save user with invalid password', async () => {
    const newUser = {
      username: 'mcardenas',
      name: 'manuel cardenas',
      password: 'ta'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
