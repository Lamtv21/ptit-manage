import { NextFunction, Request, Response } from 'express'
import ApiError from '../utils/apiError'
import httpStatus from 'http-status'

export const errorConverter = (err: any, _req: Request, res: Response, next: NextFunction) => {
  let error = err
  if (!(error instanceof ApiError)) {
    console.error('error', error)
    const statusCode = error.statusCode
    const message = error.message || httpStatus[statusCode]
    error = new ApiError(statusCode, message, false, err.stack)
  }
  next(error)
}

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const { statusCode, message } = err

  try {
    res.locals.errorMessage = err.message

    const response = {
      code: statusCode,
      message,
      data: null
    }

    res.status(statusCode).send(response)
  } catch (error) {
    console.log(err)
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: err.message, statusCode: httpStatus.INTERNAL_SERVER_ERROR, data: null })
  }
}
