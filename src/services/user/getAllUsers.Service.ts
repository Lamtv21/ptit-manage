import { findAll } from '../../repository/user.repository'

const getAllUsersService = async () => {
  const usersRec = await findAll()

  return usersRec
}

export default getAllUsersService
