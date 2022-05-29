import { SexType } from '../../database/entities/user.entity'

export type UserLoginResponse = {
  accessToken: string
  refreshToken: string
}

export type UserType = {
  id: number
  hashedPassword: string
  userTypeId: number
  firstName: string
  lastName: string
  email: string | null | undefined
  phoneNumber: string | null | undefined
  sex: SexType | null | undefined
  age: number | null | undefined
  refreshToken: string | null | undefined
  address: string | null | undefined
  createdAt: Date | null | undefined
  updatedAt: Date | null | undefined
}
