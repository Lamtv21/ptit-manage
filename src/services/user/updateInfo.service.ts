import httpStatus from 'http-status'
import { User } from '../../database/entities/user.entity'
import { findOneUserByUserId, updateUser } from '../../repository/user.repository'
import ApiError from '../../utils/apiError'

const updateInfoService = async (optionsUpdate: any, userId: number) => {
  const { phoneNumber, sex, age, address, firstName, lastName, email, userTypeId } = optionsUpdate

  const user = await findOneUserByUserId(userId)

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!')
  }

  const newUser = new User()
  newUser.id = user.id
  phoneNumber && (newUser.phoneNumber = phoneNumber)
  sex && (newUser.sex = sex)
  age && (newUser.age = age)
  address && (newUser.address = address)
  firstName && (newUser.firstName = firstName)
  lastName && (newUser.lastName = lastName)
  email && (newUser.email = email)
  userTypeId && (newUser.userTypeId = userTypeId)

  await updateUser(newUser)
}

export default updateInfoService
