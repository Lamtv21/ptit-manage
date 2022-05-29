import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { UserTypeID } from '../../constant/UserType.constant'
import ApiError from '../../utils/apiError'
import { getAllUsersService, getUserService, updateInfoService } from '../../services/user'
import catchAsync from '../../utils/catchAsync'

export const getMeController = catchAsync(async (req: Request, res: Response) => {
  const currentUserId = req.user.id

  const result = await getUserService(currentUserId)

  return res.status(httpStatus.OK).json({ success: true, data: result, message: 'Get current user successfully!' })
})

export const updateCurrentUserInfoController = catchAsync(async (req: Request, res: Response) => {
  const optionsUpdate = req.body
  const userId = req.user.id

  await updateInfoService(optionsUpdate, userId)

  return res.status(httpStatus.OK).json({ success: true, data: null, message: 'update info of user successfully!' })
})

export const updateUserInfoController = catchAsync(async (req: Request, res: Response) => {
  const optionsUpdate = req.body
  const userTypeId = req.user.userTypeId
  const userId = req.params.id

  if (userTypeId !== UserTypeID.MANAGER) {
    throw new ApiError(httpStatus.FORBIDDEN, httpStatus['403_MESSAGE'])
  }

  await updateInfoService(optionsUpdate, Number(userId))

  return res.status(httpStatus.OK).json({ success: true, data: null, message: 'update info of user successfully!' })
})

export const getAllUsersController = catchAsync(async (req: Request, res: Response) => {
  const userTypeId = req.user.userTypeId

  if (userTypeId !== UserTypeID.MANAGER && userTypeId !== UserTypeID.ADMIN) {
    throw new ApiError(httpStatus.FORBIDDEN, httpStatus['403_MESSAGE'])
  }

  const result = await getAllUsersService()

  return res.status(httpStatus.OK).json({ success: true, data: result, message: 'get all users successfully!' })
})

export const getUserController = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id

  const result = await getUserService(Number(userId))

  return res.status(httpStatus.OK).json({ success: true, data: result, message: 'get all users successfully!' })
})
