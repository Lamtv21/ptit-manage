import { Request } from 'express'
import httpStatus from 'http-status'
import { SexType } from '../database/entities/user.entity'
import ApiError from '../utils/apiError'

export const validateUpdateCurrentInfoUser = (req: Request) => {
  let { firstName, lastName, email, address, phoneNumber } = req.body
  const { sex, age, userTypeId } = req.body

  email = email?.trim().replaceAll(/\s+/g, '')
  firstName = firstName?.trim().replaceAll(/\s+/g, '')
  lastName = lastName?.trim().replaceAll(/\s+/g, '')
  address = address?.trim().replaceAll(/\s+/g, '')
  phoneNumber = String(phoneNumber)
  phoneNumber = phoneNumber?.trim().replaceAll(/\s+/g, '')

  if (phoneNumber?.length > 10) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'length of phone number must be less than 11')
  }

  if (address?.length > 255) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'length of phone number must be less than 256')
  }

  if (sex && sex !== SexType.FEMALE && sex !== SexType.MALE && sex !== SexType.OTHER && sex !== SexType.UNKNOWN) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'sex must be enum!!')
  }

  if (age && age < 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'age must be greater than 11')
  }

  if (firstName?.length > 20) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'firstName must be less than 20 characters!')
  }

  if (lastName?.length > 20) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'lastName must be less than 20 characters!')
  }

  if (email) {
    throw new ApiError(httpStatus.FORBIDDEN, httpStatus['403_MESSAGE'])
  }

  if (userTypeId) {
    throw new ApiError(httpStatus.FORBIDDEN, httpStatus['403_MESSAGE'])
  }

  req.body.email = email
  req.body.firstName = firstName
  req.body.lastName = lastName
  req.body.phoneNumber = phoneNumber
  req.body.address = address
}

export const validateUpdateInfoUser = (req: Request) => {
  let { firstName, lastName, email, address, phoneNumber } = req.body
  const { sex, age, userTypeId } = req.body
  const id = req.params.id
  email = email?.trim().replaceAll(/\s+/g, '')
  firstName = firstName?.trim().replaceAll(/\s+/g, '')
  lastName = lastName?.trim().replaceAll(/\s+/g, '')
  address = address?.trim().replaceAll(/\s+/g, '')
  phoneNumber = String(phoneNumber)
  phoneNumber = phoneNumber?.trim().replaceAll(/\s+/g, '')

  if (phoneNumber?.length > 10) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'length of phone number must be less than 11')
  }

  if (address?.length > 255) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'length of phone number must be less than 256')
  }

  if (sex && sex !== SexType.FEMALE && sex !== SexType.MALE && sex !== SexType.OTHER && sex !== SexType.UNKNOWN) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'sex must be enum!!')
  }

  if (age && age < 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'age must be greater than 11')
  }

  if (firstName?.length > 20) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'firstName must be less than 20 characters!')
  }

  if (lastName?.length > 20) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'lastName must be less than 20 characters!')
  }

  if (
    email &&
    !email?.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email is not valid!')
  }

  try {
    Number(userTypeId)
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'userTypeId is not valid!')
  }

  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'id is required!')
  }

  req.body.email = email
  req.body.firstName = firstName
  req.body.lastName = lastName
  req.body.phoneNumber = phoneNumber
  req.body.address = address
}

export const validateGetUser = (req: Request) => {
  const id = req.params.id

  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'id is required!')
  }
}
