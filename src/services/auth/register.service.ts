import { findOneUserByEmail, insertUserIntoDatabase } from '../../repository/user.repository'
import ApiError from '../../utils/apiError'
import httpStatus from 'http-status'
import argon2 from 'argon2'

const registerUserService = async (
  email: string,
  password: string,
  userTypeId: number,
  firstName: string,
  lastName: string
) => {
  const foundUser = await findOneUserByEmail(email)

  if (foundUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'The account already exists in the system!')
  }

  const hashedPassword = await argon2.hash(password)

  const user = await insertUserIntoDatabase(email, hashedPassword, userTypeId, firstName, lastName)
  return user
}

export default registerUserService
