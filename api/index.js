import {sha256} from 'js-sha256'

const axios = require('axios')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode')
const SECRET = process.env.SECRET_DB
const passwordValidator = require('password-validator')
const upload = require('express-fileupload')
const TwitchApi = require("node-twitch").default;
const twitch = new TwitchApi({
  client_id: process.env.TWITCH_ID,
  client_secret: process.env.TWITCH_SECRET
})

// eslint-disable-next-line new-cap
const passwordSchema = new passwordValidator()
passwordSchema.is().min(8)
passwordSchema.is().max(70)

// eslint-disable-next-line new-cap
const usernameSchema = new passwordValidator()
usernameSchema.is().min(1)
usernameSchema.is().max(30)

app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(upload())


app.get("/streamers/", async (req, res) => {
  let users = await prisma.users.findMany()
  users = users.filter(user => user.verified === 1)
  users = users.filter(user => user.twitch_username !== "")
  users = users.map(user => user.twitch_username)

  const streams = await twitch.getStreams({ channels: users })
  res.send(streams)
})

app.get('/users/', async (req, res) => {
  try {
    const cookies = req.headers.cookie
    const cookie = getCookie('auth._token.local', cookies).replace('Bearer%20', '')
    const token = jwt.verify(cookie, SECRET, ['HS256'])
    if (token.admin !== 1) {
      res.send({ error: 'Access denied' })
      return
    }
  } catch (e) {
    res.send({ error: 'Access denied' })
    return
  }

  const users = await prisma.users.findMany()
  users.filter(user => delete user.password)
  res.send(users)
})

app.get('/users/:id', async (req, res) => {
  const cookies = req.headers.cookie
  const cookie = getCookie('auth._token.local', cookies).replace('Bearer%20', '')
  const token = jwt.verify(cookie, SECRET, ['HS256'])


  let id = parseInt(req.params.id)
  if (isNaN(id)) {
    id = token.id
  }

  try {
    if (token.id !== id && token.admin !== 1 && token.id !== id) {
      res.send({ error: 'Access denied' })
      return
    }
  } catch (e) {
    res.send({ error: 'Access denied' })
    return
  }

  const users = await prisma.users.findMany({
    where: {
      id
    }
  })

  users.filter(user => delete user.password)
  const user = users[0]

  res.send(user)
})

app.get('/members', async (req, res) => {
  const users = await prisma.users.findMany({
    where: {
      verified: 1
    }
  })

  const tasks = users.map(async (user) => {

    const memberDetails = (await axios.get(`https://pointercrate.com/api/v1/players/${user.pointercrate_id}`)).data.data
    let memberRanking = (await axios.get(`https://pointercrate.com/api/v1/players/ranking`, {
      params: {
        name_contains: memberDetails.name
      }
    })).data[0]

    if (memberRanking === undefined) {
      memberRanking = {
        rank: 99999999999,
        score: -1,
        nationality: {
          country_code: "?",
          nation: "?",
          subdivision: "?"
        }
      }
    }


    return {
      ...memberDetails,
      ...memberRanking,
      user_id: user.id,
      avatar_url: user.profile_picture_link,
      score: memberRanking.score.toFixed(2)
    }
  })

  const members = await Promise.all(tasks)
  res.send(members)
})

app.get('/auth/user', (req, res) => {

  const cookie = req.headers.cookie
  const token = getCookie('auth._token.local', cookie).replace('Bearer%20', '')
  const decoded = jwtDecode(token)


  jwt.verify(token, SECRET, ['HS256'])

  const user = {
    id: decoded.id,
    name: decoded.name,
    profile_picture_link: decoded.profile_picture_link,
    admin: decoded.admin
  }

  res.send({
    user
  })
})

app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body

  // validate user input
  if (username === '' || password === '') {
    res.status(400).send({ error: 'All input is required' })
    return
  }

  // check if the user exists
  let users = await prisma.users.findMany({
    where: {
      name: username,
      password: sha256(password)
    }
  })

  if (!users[0]) {
    users = await prisma.users.findMany({
      where: {
        email: username,
        password: sha256(password)
      }
    })
  }

  if (users[0]) {
    let user = users[0]
    // filter the object
    user = {
      id: user.id,
      name: user.name,
      profile_picture_link: user.profile_picture_link,
      admin: user.admin,
      email: user.email
    }

    const token = jwt.sign(user, SECRET)
    res.status(200).send({ token, user })
    return
  }

  res.status(401).send('Invalid credentials')
})

app.post('/auth/register', async (req, res) => {
  const { email, username, password } = req.body.data

  // validate user input
  if (username === '' || password === '' || email === '') {
    res.status(200).send({ error: 'All input is required' })
    return
  }

  const isUsernameValid = usernameSchema.validate(username, { list: true })
  if (isUsernameValid.includes('min')) {
    res.status(200).send({ error: 'The username is too short' })
    return
  }
  if (isUsernameValid.includes('max')) {
    res.status(200).send({ error: 'The username is too long' })
    return
  }

  const isPasswordValid = passwordSchema.validate(password, { list: true })
  if (isPasswordValid.includes('min')) {
    res.status(200).send({ error: 'The password is too short' })
    return
  }
  if (isPasswordValid.includes('max')) {
    res.status(200).send({ error: 'The password is too long' })
    return
  }
  if (!validateEmail(email)) {
    res.status(200).send({ error: 'Please enter a valid email' })
    return
  }

  let users = await prisma.users.findMany({
    where: {
      email
    }
  })

  if (users[0]) {
    res.status(200).send({ error: 'Email is already taken' })
    return
  }

  users = await prisma.users.findMany({
    where: {
      name: username
    }
  })

  if (users[0]) {
    res.status(200).send({ error: 'Username is already taken' })
    return
  }

  const encrypted = sha256(password)
  await prisma.users.create({
    data: {
      name: username,
      password: encrypted,
      email
    }
  })

  res.status(200).send({ message: 'Successfully registered' })
})

app.patch('/users', async (req, res) => {
  let data = req.body
  const dataToUpdate = {}
  let id = 0
  const errors = {
    username: [],
    email: [],
    password: []
  }
  const success = []

  const cookies = req.headers.cookie
  const cookie = getCookie('auth._token.local', cookies).replace('Bearer%20', '')
  let token = jwt.verify(cookie, SECRET, ['HS256'])

  if (data.verified !== undefined || data.pointercrate !== undefined || data.admin !== undefined) {
    try {
      if (token.admin !== 1) {
        res.send({ error: 'Access denied' })
        return
      }
    } catch (e) {
      res.send({ error: 'Access denied' })
      return
    }
    id = parseInt(data.userToEditId)
    dataToUpdate.admin = data.admin
    dataToUpdate.verified = data.verified
    dataToUpdate.pointercrate_id = data.pointercrate
  } else {
    id = parseInt(token.id)
  }

  let userToUpdate = await prisma.users.findMany({
    where: {
      id
    }
  })

  userToUpdate = userToUpdate[0]

  // USERNAME

  if (userToUpdate.name !== data.username) {
    const isUsernameValid = usernameSchema.validate(data.username, { list: true })
    if (isUsernameValid.includes('min')) {
      errors.username.push('The username is too short')
    }
    if (isUsernameValid.includes('max')) {
      errors.username.push('The username is too long')
    }

    const users = await prisma.users.findMany({ where: { name: data.username } })
    if (users[0]) {
      errors.username.push('Username is already taken')
    }

    if (errors.username.length === 0) {
      dataToUpdate.name = data.username
      success.push('Username successfully updated')
    }
  }

  if (userToUpdate.twitch_username !== data.twitch_username) {
    dataToUpdate.twitch_username = data.twitch_username
    success.push('Twitch username successfully updated')
  }

  // email
  if (userToUpdate.email !== data.email) {
    if (!validateEmail(data.email)) {
      errors.email.push('The email is invalid')
    }
    const users = await prisma.users.findMany({ where: { email: data.email } })
    if (users[0]) {
      errors.email.push('Email is already taken')
    }

    if (errors.email.length === 0) {
      success.push('Email successfully updated')
      dataToUpdate.email = data.email
    }
  }


  // password
  const newEncrypted = sha256(data.newPassword)
  const previousEncrypted = sha256(data.previousPassword)
  if (data.previousPassword.length > 0) {
    if (previousEncrypted !== userToUpdate.password) {
      errors.password.push('The previous password is incorrect !')
    }

    if (data.newPassword !== data.confirmNewPassword) {
      errors.password.push('The 2 passwords doesn\'t match!')
    }

    const isPasswordValid = passwordSchema.validate(data.newPassword, { list: true })
    if (isPasswordValid.includes('min')) {
      errors.password.push('The new password is too short!')
    }
    if (isPasswordValid.includes('max')) {
      errors.password.push('The new password is too long!')
    }

    if (newEncrypted === dataToUpdate.password) {
      errors.password.push('You used the same password!')
    }

    if (errors.password.length === 0) {
      success.push('Password successfully updated')
      dataToUpdate.password = newEncrypted
    }
  }

  data = dataToUpdate
  const updatedUser = await prisma.users.update({
    where: {
      id
    },
    data
  })

  const user = {
    id: updatedUser.id,
    name: updatedUser.name,
    profile_picture_link: updatedUser.profile_picture_link,
    admin: updatedUser.admin,
    email: updatedUser.email,
    twitch_username: updatedUser.twitch_username
  }

  token = jwt.sign(user, SECRET)
  res.status(200).send({ token, user, success, errors })
})

app.post('/avatar', async (req, res) => {
  const cookies = req.headers.cookie
  const cookie = getCookie('auth._token.local', cookies).replace('Bearer%20', '')
  let token = jwt.verify(cookie, SECRET, { expiresIn: '365 days' })
  const id = token.id

  if (req.files) {
    const file = req.files.image
    await file.mv(`./static/avatars/${id}.png`, async (err) => {
      if (err) {
        res.send(err)
      } else {
        let userToUpdate = await prisma.users.findMany({
          where: {
            id
          }
        })

        userToUpdate = userToUpdate[0]

        const user = {
          id: userToUpdate.id,
          name: userToUpdate.name,
          profile_picture_link: `/avatars/${id}.png`,
          admin: userToUpdate.admin,
          email: userToUpdate.email
        }

        await prisma.users.update({
          where: {
            id
          },
          data: {
            profile_picture_link: user.profile_picture_link
          }
        })

        console.log(user)

        token = jwt.sign(user, SECRET)
        res.status(200).send({ token, user, success: 'Avatar has been successfully updated' })
      }
    })
  } else {
    res.send({ error: 'Unknown error, contact Hikudo#1714 on discord.' })
  }
})

function getCookie(name, cookie) {
  const parts = cookie.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export default {
  path: '/api',
  handler: app
}
