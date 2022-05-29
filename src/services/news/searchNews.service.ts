import { searchNewsByTitle } from '../../repository/news.repository'

const searchNewsService = async (title: string) => {
  const result = await searchNewsByTitle(title)

  return result
}

export default searchNewsService
