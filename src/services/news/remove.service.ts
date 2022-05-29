import httpStatus from 'http-status'
import ApiError from '../../utils/apiError'
import { findOne, removeANews } from '../../repository/news.repository'

const removeANewsService = async (id: number) => {
  const newsFound = await findOne(id)

  if (!newsFound) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'news not found!')
  }
  await removeANews(id)
}

export default removeANewsService
