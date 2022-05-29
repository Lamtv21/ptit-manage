import httpStatus from 'http-status'
import ApiError from '../../utils/apiError'
import { FREFIX_RESET_TOKEN_PASSWORD } from '../../constant/prefix.redis'
import argon2 from 'argon2'
import { updatePasswordByUserId } from '../../repository/user.repository'

const resetPasswordService = async (resetToken: string, userId: number, password: string, redisClient: any) => {
  const resetTokenRedis = await redisClient.get(`${FREFIX_RESET_TOKEN_PASSWORD}${userId}`)

  // if token redis is not valid or is not exist return bad request
  if (!resetTokenRedis || resetTokenRedis !== resetToken) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Bad request')
  }

  //remove reset token
  await redisClient.del(`${FREFIX_RESET_TOKEN_PASSWORD}${userId}`)

  const hashedPassword = await argon2.hash(password)

  await updatePasswordByUserId(userId, hashedPassword)
}

export default resetPasswordService
