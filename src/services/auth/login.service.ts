import httpStatus from 'http-status'
import { findOneUserByEmail, updateRefreshTokenByUserId } from '../../repository/user.repository'
import ApiError from '../../utils/apiError'
import { UserLoginResponse, UserType } from './types'
import jwt from 'jsonwebtoken'
import { configuration } from '../../config/configuration'
import argon2 from 'argon2'

const userLoginService = async (email: string, password: string): Promise<UserLoginResponse> => {
  const user: UserType | undefined = await findOneUserByEmail(email)

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email or password is not valid!')
  }

  const foundPassword = await argon2.verify(user.hashedPassword, password)

  if (!foundPassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email or password is not valid!')
  }

  const dataToken = getToken(user)
  await updateRefreshTokenByUserId(user.id, dataToken.refreshToken)

  return dataToken
}

const getToken = (user: UserType) => {
  const refreshTokenPayload = {
    id: user.id,
    email: user.email,
    userTypeId: user.userTypeId
  }

  const accessTokenPayload = {
    id: user.id,
    email: user.email,
    userTypeId: user.userTypeId,
    firstName: user.firstName,
    lastName: user.lastName
  }

  const accessToken = jwt.sign(accessTokenPayload, configuration.jwt.secretKey, {
    expiresIn: configuration.jwt.accessTokenExpired
  })

  const refreshToken = jwt.sign(refreshTokenPayload, configuration.jwt.secretKey, {
    expiresIn: configuration.jwt.refreshTokenExpired
  })

  return { accessToken, refreshToken }
}

export default userLoginService
