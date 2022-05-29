import ApiError from '../../utils/apiError'
import { updateRefreshTokenByUserId, findOneUserByUserId } from '../../repository/user.repository'
import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import { UserType } from './types'
import { configuration } from '../../config/configuration'

const refreshTokenService = async (refreshToken: string) => {
  const decoded = jwt.verify(refreshToken, configuration.jwt.secretKey) as jwt.JwtPayload

  const foundUser = await findOneUserByUserId(decoded.id)

  if (!foundUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'The account is not exists in the system!')
  }

  if (foundUser.refreshToken !== refreshToken) {
    await updateRefreshTokenByUserId(foundUser.id, undefined)

    throw new ApiError(httpStatus.BAD_REQUEST, 'refreshToken not found!')
  }

  const token = await getToken(foundUser, Number(decoded.exp), refreshToken)

  return token
}

const getToken = async (user: UserType, exp: number, refreshToken: string) => {
  const SECOND_ON_WEEK = 24 * 3600 * 7

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

  const result = {
    accessToken,
    refreshToken
  }

  const timeExpired = exp - Date.now() / 1000

  //if time expired <= 30% then reset refreshtoken
  if (SECOND_ON_WEEK / timeExpired <= 0.3) {
    const refreshTokenPayload = {
      id: user.id,
      email: user.email,
      userTypeId: user.userTypeId
    }

    const newRefreshToken = jwt.sign(refreshTokenPayload, configuration.jwt.secretKey, {
      expiresIn: configuration.jwt.refreshTokenExpired
    })

    await updateRefreshTokenByUserId(user.id, newRefreshToken)
    result.refreshToken = newRefreshToken
  }

  return result
}

export default refreshTokenService
