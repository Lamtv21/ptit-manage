import { Response, Request } from 'express'
import httpStatus from 'http-status'
import ApiError from '../../utils/apiError'
import catchAsync from '../../utils/catchAsync'
import { UserLoginType } from './types'
import { UserTypeID } from '../../constant/UserType.constant'
import {
  forgotPasswordService,
  changePasswordService,
  refreshTokenService,
  registerUserService,
  userLoginService,
  resetPasswordService
} from '../../services/auth'

export const userLoginController = catchAsync(async (req: Request, res: Response) => {
  const { email, password }: UserLoginType = req.body

  const result = await userLoginService(email, password)

  return res.status(httpStatus.OK).json({ success: true, data: result, message: 'User login successfully!' })
})

export const registerUserController = catchAsync(async (req: Request, res: Response) => {
  const { email, password, userTypeId, firstName, lastName } = req.body
  const { userTypeId: permission } = req.user

  if (permission != UserTypeID.MANAGER) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Can not access to API!')
  }

  const result = await registerUserService(email, password, userTypeId, firstName, lastName)

  return res.status(httpStatus.OK).json({ success: true, data: result, message: 'Register user successfully!' })
})

export const changePasswordController = catchAsync(async (req: Request, res: Response) => {
  const { password } = req.body
  const { id } = req.user

  await changePasswordService(id, password)

  return res.status(httpStatus.OK).json({ success: true, data: null, message: 'Update password successfully!' })
})

export const forgotPasswordController = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body

  await forgotPasswordService(email, res.redisClient)

  return res.status(httpStatus.OK).json({ success: true, data: null, message: 'Send email successfully!' })
})

export const refreshTokenController = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.body

  const result = await refreshTokenService(refreshToken)

  return res.status(httpStatus.OK).json({ success: true, data: result, message: 'Get access token successfully!' })
})

export const resetPasswordController = catchAsync(async (req: Request, res: Response) => {
  const { password, resetToken, userId } = req.body
  const redisClient = res.redisClient

  await resetPasswordService(resetToken, userId, password, redisClient)

  return res.status(httpStatus.OK).json({ success: true, data: null, message: 'Reset password successfully!' })
})
