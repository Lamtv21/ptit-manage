import { Request } from 'express'
import httpStatus from 'http-status'
import { UserTypeID } from '../constant/UserType.constant'
import ApiError from '../utils/apiError'

export const validateLogin = (req: Request) => {
  let { email, password } = req.body
  email = email?.trim().replaceAll(/\s+/g, '')
  password = password?.trim().replaceAll(/\s+/g, '')

  validateEmailAndPassword(email, password)

  req.body.email = email
  req.body.password = password
}

export const validateRegisterAccount = (req: Request) => {
  let { email, password, confirmPassword, firstName, lastName } = req.body
  const { userTypeId } = req.body

  email = email?.trim().replaceAll(/\s+/g, '')
  password = password?.trim().replaceAll(/\s+/g, '')
  firstName = firstName?.trim().replaceAll(/\s+/g, '')
  lastName = lastName?.trim().replaceAll(/\s+/g, '')

  confirmPassword = confirmPassword?.trim().replaceAll(/\s+/g, '')

  validateEmailAndPassword(email, password)

  if (password !== confirmPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password must be equals to confirmPassword')
  }

  if (!userTypeId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'userTypeId is required!')
  }

  if (!firstName) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'firstName is required!')
  }

  if (firstName.length > 20) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'firstName must be less than 20 characters!')
  }

  if (!lastName) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'lastName is required!')
  }

  if (lastName.length > 20) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'lastName must be less than 20 characters!')
  }

  if (userTypeId != UserTypeID.ADMIN && userTypeId != UserTypeID.STUDENT) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'userTypeId must be equals to 2 or 3!')
  }

  req.body.email = email
  req.body.password = password
  req.body.confirmPassword = confirmPassword
  req.body.firstName = firstName
  req.body.lastName = lastName
}

export const validateChangePassword = (req: Request) => {
  let { password, confirmPassword } = req.body

  password = password?.trim().replaceAll(/\s+/g, '')
  confirmPassword = confirmPassword?.trim().replaceAll(/\s+/g, '')

  if (!confirmPassword || !password) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'password and confirmPassword is required!')
  }

  if (password.length < 6) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password must be greater than or equals 8 characters!')
  }

  if (password !== confirmPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password must be equals to confirmPassword')
  }

  req.body.password = password
  req.body.confirmPassword = confirmPassword
}

export const validateRefreshToken = (req: Request) => {
  const { refreshToken } = req.body

  if (!refreshToken) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'refreshToken is required!')
  }
}

export const validateForgotPassword = (req: Request) => {
  const { email } = req.body

  if (!email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email is required!')
  }

  if (
    !email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email is not valid!')
  }
}

export const validateResetPassword = (req: Request) => {
  let { password, confirmPassword } = req.body
  const { resetToken, userId } = req.body

  if (!resetToken || !userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'resetToken and userId is required!')
  }

  password = password?.trim().replaceAll(/\s+/g, '')
  confirmPassword = confirmPassword?.trim().replaceAll(/\s+/g, '')

  if (!confirmPassword || !password) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'password and confirmPassword is required!')
  }

  if (password.length < 6) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password must be greater than or equals 8 characters!')
  }

  if (password !== confirmPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password must be equals to confirmPassword')
  }

  req.body.password = password
  req.body.confirmPassword = confirmPassword
}

const validateEmailAndPassword = (email: string, password: string) => {
  if (!email || !password) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email and password is required!')
  }

  if (
    !email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email is not valid!')
  }

  if (password.length > 50) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password must be less than 50 characters!')
  }

  if (password.length < 6) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password must be greater than or equals 8 characters!')
  }
}
