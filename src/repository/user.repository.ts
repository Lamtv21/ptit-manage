import { User } from '../database/entities/user.entity'

export const findOneUserByEmail = async (email: string) => {
  const user = await User.findOne({
    where: {
      email
    }
  })

  return user
    ? {
        id: user.id,
        hashedPassword: user.hashedPassword,
        userTypeId: user.userTypeId,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        sex: user.sex,
        email: user.email,
        age: user.age,
        address: user.address,
        refreshToken: user.refreshToken,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    : undefined
}

export const findOneUserByUserId = async (userId: number) => {
  const user = await User.findOne({
    where: {
      id: userId
    }
  })

  return user
    ? {
        id: user.id,
        hashedPassword: user.hashedPassword,
        userTypeId: user.userTypeId,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        sex: user.sex,
        email: user.email,
        age: user.age,
        address: user.address,
        refreshToken: user.refreshToken,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    : undefined
}

export const updateRefreshTokenByUserId = async (userId: number, refreshToken: string | undefined) => {
  await User.update({ id: userId }, { refreshToken })
}

export const insertUserIntoDatabase = async (
  email: string,
  password: string,
  userTypeId: number,
  firstName: string,
  lastName: string
) => {
  let user = new User()
  user.email = email
  user.firstName = firstName
  user.lastName = lastName
  user.hashedPassword = password
  user.userTypeId = userTypeId

  user = await User.save(user)

  return {
    id: user.id,
    userTypeId: user.userTypeId,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    sex: user.sex,
    email: user.email,
    age: user.age,
    address: user.address,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }
}

export const updatePasswordByUserId = async (userId: number, password: string) => {
  await User.update({ id: userId }, { hashedPassword: password })
}

export const updateUser = async (user: User) => {
  await User.save(user)
}

export const findAll = async () => {
  const usersRec = await User.find()

  const result = usersRec.map(user => ({
    id: user.id,
    userTypeId: user.userTypeId,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    sex: user.sex,
    email: user.email,
    age: user.age,
    address: user.address,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }))

  return result
}
