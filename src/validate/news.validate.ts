import { Request } from 'express'
import httpStatus from 'http-status'
import ApiError from '../utils/apiError'

export const validateCreateNews = (req: Request) => {
  const { title, content, imgUrl } = req.body

  if (!title || !content || !imgUrl) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'title, content, imgUrl is required!')
  }

  if (title > 500) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'length of title must be less than 500 characters!')
  }

  if (imgUrl > 200) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'length of imgUrl must be less than 200 charaters!')
  }
}

export const validateGetANews = (req: Request) => {
  const id = req.params.id

  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'id is required!')
  }

  try {
    Number(id)
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'id must br number!')
  }
}

export const validateUpdateANews = (req: Request) => {
  const { title, imgUrl } = req.body
  const id = req.params.id

  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'id is required!')
  }

  try {
    Number(id)
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'id must br number!')
  }

  if (title > 500) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'length of title must be less than 500 characters!')
  }

  if (imgUrl > 200) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'length of imgUrl must be less than 200 charaters!')
  }
}

export const validateSearchListNews = (req: Request) => {
  const { title } = req.query

  if (!title) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'title is required!')
  }
}
