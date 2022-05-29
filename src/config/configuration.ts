import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import dotenv from 'dotenv'
dotenv.config()

export const configDatabase: PostgresConnectionOptions = {
  type: 'postgres',
  database: process.env.DB_NAME_DEV as string,
  host: (process.env.DB_HOST_DEV as string) || 'localhost',
  username: process.env.DB_USERNAME_DEV as string,
  password: process.env.DB_PASSWORD_DEV as string,
  port: Number(process.env.DB_PORT),
  logging: false,
  synchronize: false
}

export const configuration = {
  port: Number(process.env.PORT),
  jwt: {
    secretKey: String(process.env.SECRET_JWT),
    accessTokenExpired: String(process.env.ACCESS_TOKEN_EXPIRED),
    refreshTokenExpired: String(process.env.REFRESH_TOKEN_EXPIRED)
  },
  email: {
    username: String(process.env.EMAIL_ACCOUNT),
    password: String(process.env.EMAIL_PASS),
    service: String(process.env.EMAIL_SERVICE)
  },
  hash: {
    secretKey: String(process.env.HASH_SECRET)
  },
  redis: {
    url: `redis://${process.env.REDIS_HOST ? String(process.env.REDIS_HOST) : 'localhost'}:${
      process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379
    }`
  }
}
