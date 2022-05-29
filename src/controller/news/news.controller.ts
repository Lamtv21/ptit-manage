import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import {
  createNewsService,
  getAllNewsService,
  getANewsService,
  removeANewsService,
  searchNewsService,
  updateANewsService
} from '../../services/news'
import { UserTypeID } from '../../constant/UserType.constant'
import ApiError from '../../utils/apiError'

export const createNewsController = catchAsync(async (req: Request, res: Response) => {
  const { title, content, imgUrl } = req.body
  const userId = Number(req.user.id)

  const result = await createNewsService(title, content, imgUrl, userId)

  return res.status(httpStatus.OK).json({ success: true, data: result, message: 'create news successfully!' })
})

export const getAllNewsController = catchAsync(async (req: Request, res: Response) => {
  const result = await getAllNewsService()

  return res.status(httpStatus.OK).json({ success: true, data: result, message: 'get all news successfully!' })
})

export const getANewsController = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  const result = await getANewsService(id)

  return res.status(httpStatus.OK).json({ success: true, data: result, message: 'get a news successfully!' })
})

export const updateANewsController = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { title, content, imgUrl } = req.body
  const userId = req.user.id

  await updateANewsService(title, content, imgUrl, id, userId)

  return res.status(httpStatus.OK).json({ success: true, data: null, message: 'update a news successfully!' })
})

export const searchNewsController = catchAsync(async (req: Request, res: Response) => {
  const { title } = req.query

  const result = await searchNewsService(title as string)

  return res.status(httpStatus.OK).json({ success: true, data: result, message: 'get list news successfully!' })
})

export const removeANewsController = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const { userTypeId: permission } = req.user

  if (permission != UserTypeID.MANAGER) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Can not access to API!')
  }

  await removeANewsService(Number(id))

  return res.status(httpStatus.OK).json({ success: true, data: null, message: 'remove a news successfully!' })
})
