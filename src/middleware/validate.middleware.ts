import { NextFunction, Request, Response } from 'express'
import ApiError from '../utils/apiError'

const validate = (funcValidate: any) => (req: Request, _res: Response, next: NextFunction) => {
  try {
    funcValidate(req)
    next()
  } catch (error: any) {
    return next(new ApiError(error.statusCode, error.message))
  }
}

export default validate
