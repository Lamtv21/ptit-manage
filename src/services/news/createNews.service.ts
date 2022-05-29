import { createNews } from '../../repository/news.repository'
import { removeAccent } from './common.service'

const createNewsService = async (title: string, content: string, imgUrl: string, userId: number) => {
  const titleNoAccent = removeAccent(title)

  const news = await createNews(title, titleNoAccent, content, imgUrl, userId)

  return news
}

export default createNewsService
