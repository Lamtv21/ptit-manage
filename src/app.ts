import express, { Express } from 'express'
import { createConnection } from 'typeorm'
import cors from 'cors'
import typeormConfig from './database/typeormconfig'
import morgan from 'morgan'
import routesV1 from './routes'
import { errorConverter, errorHandler } from './middleware/error.middleware'
import { createClient } from 'redis'
import redisClient from './middleware/redis.middleware'
import { configuration } from './config/configuration'
import jwt from 'jsonwebtoken'

const main = async (PORT: number) => {
  await createConnection(typeormConfig)
  console.log('database connected!')

  const client = createClient({ url: configuration.redis.url })

  client.on('error', err => console.log('Redis Client Error', err))

  await client.connect()
  console.log('redis connected!')

  const app: Express = express()

  //--------

  var cookieParser = require('cookie-parser')
  app.use(cookieParser())

  const path = require('path')
  app.set('view engine', 'pug')
  app.set('views', './views')

  app.use(morgan('combined'))
  app.use(cors())
  app.use(express.json())
  app.use(redisClient(client))
  //-------------
  app.use('/css', express.static(__dirname + '/views/css'))
  app.use('/js', express.static(__dirname + '/views/js'))
  app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/views/html/login.html')))
  app.get('/login', (req, res) => res.sendFile(path.join(__dirname + '/views/html/login.html')))
  app.get('/add-new', (req, res) => {
    if (req.cookies['token'] != null && checkrole(req.cookies['token']) == 1) {
      res.sendFile(path.join(__dirname + '/views/html/add-new.html'))
    } else {
      res.sendFile(path.join(__dirname + '/views/html/login.html'))
    }
  })
  app.get('/detail-new', (req, res) => res.sendFile(path.join(__dirname + '/views/html/detail-new.html')))
  app.get('/forgot-pass', (req, res) => res.sendFile(path.join(__dirname + '/views/html/forgot-pass.html')))
  app.get('/home', (req, res) => res.sendFile(path.join(__dirname + '/views/html/home.html')))
  app.get('/info-user', (req, res) => {
    if (req.cookies['token'] != null && checkrole(req.cookies['token']) == 1) {
      res.sendFile(path.join(__dirname + '/views/html/info-user.html'))
    } else {
      res.sendFile(path.join(__dirname + '/views/html/login.html'))
    }
  })
  app.get('/news', (req, res) => {
    if (req.cookies['token'] != null && checkrole(req.cookies['token']) == 1) {
      res.sendFile(path.join(__dirname + '/views/html/news.html'))
    } else {
      res.sendFile(path.join(__dirname + '/views/html/login.html'))
    }
  })
  app.get('/profile', (req, res) => res.sendFile(path.join(__dirname + '/views/html/profile.html')))
  app.get('/register', (req, res) => {
    if (req.cookies['token'] != null && checkrole(req.cookies['token']) == 1) {
      res.sendFile(path.join(__dirname + '/views/html/register.html'))
    } else {
      res.sendFile(path.join(__dirname + '/views/html/login.html'))
    }
  })
  app.get('/resetpassword', (req, res) => res.sendFile(path.join(__dirname + '/views/html/reset-pass.html')))
  app.get('/user-management', (req, res) => {
    if (req.cookies['token'] != null && checkrole(req.cookies['token']) == 1) {
      res.sendFile(path.join(__dirname + '/views/html/user-management.html'))
    } else {
      res.sendFile(path.join(__dirname + '/views/html/login.html'))
    }
  })

  app.use('/api', routesV1)

  app.use(errorConverter)
  app.use(errorHandler)

  app.listen(PORT, () => console.log(`Server start at ${PORT}`))
}

function checkrole(s: string) {
  var token = s
  console.log(s)
  if (!token) {
    return null
  } else {
    try {
      const decoded = jwt.verify(token, configuration.jwt.secretKey) as jwt.JwtPayload
      return decoded.userTypeId
    } catch (error) {
      return null
    }
  }
}

export default main
