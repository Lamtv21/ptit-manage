import httpStatus from 'http-status'
import ApiError from '../../utils/apiError'
import { findOneUserByUserId } from '../../repository/user.repository'

const getUserService = async (id: number) => {
  const currentUser = await findOneUserByUserId(id)

  if (!currentUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!')
  }

  const { hashedPassword, refreshToken, ...user } = currentUser

  return user
}

export default getUserService
