import { getAll } from '../../repository/news.repository'

const getAllNewsService = async () => {
  const result = await getAll()

  return result
}

export default getAllNewsService
