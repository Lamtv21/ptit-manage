import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import { configuration } from '../config/configuration'
import ApiError from '../utils/apiError'

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']

  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'Access token not found!'))
  } else {
    try {
      const decoded = jwt.verify(token, configuration.jwt.secretKey) as jwt.JwtPayload

      req.user = {
        id: decoded.id,
        email: decoded.email,
        userTypeId: decoded.userTypeId,
        firstName: decoded.firstName,
        lastName: decoded.lastName
      }
      next()
    } catch (error) {
      return next(new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token!'))
    }
  }
}

export default verifyToken
