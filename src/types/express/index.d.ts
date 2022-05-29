import express from 'express'
import { RedisClientType } from 'redis'

declare global {
  namespace Express {
    interface Request {
      user?: any
    }

    interface Response {
      redisClient: any
    }
  }
}
