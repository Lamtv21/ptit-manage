import { findOne, updateANews } from '../../repository/news.repository'
import { News } from '../../database/entities/news.entity'
import ApiError from '../../utils/apiError'
import httpStatus from 'http-status'
import { removeAccent } from './common.service'

const updateANewsService = async (
  title: string | undefined,
  content: string | undefined,
  imgUrl: string | undefined,
  id: number,
  userId: number
) => {
  const newsFound = await findOne(id)

  if (!newsFound) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'News not found!')
  }

  if (newsFound.user.id !== userId) {
    throw new ApiError(httpStatus.FORBIDDEN, httpStatus['403_MESSAGE'])
  }

  const newNews = new News()
  newNews.id = newsFound.id
  if (title) {
    const titleNoAccent = removeAccent(title)
    newNews.title = title
    newNews.titleNoAccent = titleNoAccent
  }

  content && (newNews.content = content)
  imgUrl && (newNews.imgUrl = imgUrl)

  await updateANews(newNews)
}

export default updateANewsService
