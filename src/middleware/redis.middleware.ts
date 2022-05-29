import { NextFunction, Request, Response } from 'express'

const redisClient = (redis: any) => (req: Request, res: Response, next: NextFunction) => {
  res.redisClient = redis
  next()
}

export default redisClient
