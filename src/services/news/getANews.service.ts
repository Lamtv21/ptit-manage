import { findOne } from '../../repository/news.repository'

const getANewsService = async (id: number) => {
  const result = await findOne(id)

  return result
}

export default getANewsService
