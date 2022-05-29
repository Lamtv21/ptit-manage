import ApiError from '../../utils/apiError'
import { findOneUserByUserId, updatePasswordByUserId } from '../../repository/user.repository'
import httpStatus from 'http-status'
import argon2 from 'argon2'

const changePasswordService = async (userId: number, password: string) => {
  const foundUser = await findOneUserByUserId(userId)

  if (!foundUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'The account is not exists in the system!')
  }

  const hashedPassword = await argon2.hash(password)

  await updatePasswordByUserId(userId, hashedPassword)
}

export default changePasswordService
