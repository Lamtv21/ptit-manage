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

const main = async (PORT: number) => {
  await createConnection(typeormConfig)
  console.log('database connected!')

  const client = createClient({ url: configuration.redis.url })

  client.on('error', err => console.log('Redis Client Error', err))

  await client.connect()
  console.log('redis connected!')

  const app: Express = express()

  app.use(morgan('combined'))
  app.use(cors())
  app.use(express.json())
  app.use(redisClient(client))

  app.use('/api', routesV1)

  app.use(errorConverter)
  app.use(errorHandler)

  app.listen(PORT, () => console.log(`Server start at ${PORT}`))
}

export default main
