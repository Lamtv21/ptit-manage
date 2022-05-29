import httpStatus from 'http-status'
import ApiError from '../utils/apiError'
import { News } from '../database/entities/news.entity'
import { ILike } from 'typeorm'

export const createNews = async (
  title: string,
  titleNoAccent: string,
  content: string,
  imgUrl: string,
  userId: number
) => {
  const news = new News()
  news.content = content
  news.title = title
  news.titleNoAccent = titleNoAccent
  news.imgUrl = imgUrl
  news.userId = userId

  const result = await News.save(news)

  return {
    id: result.id,
    title,
    titleNoAccent,
    content,
    imgUrl,
    userId,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt
  }
}

export const getAll = async () => {
  const newsrecs = await News.find({ order: { createdAt: 'DESC' }, relations: ['user'] })

  const result = newsrecs.map(news => {
    let titleShort = news.title.slice(0, 40)
    if (titleShort.length === 40) {
      titleShort += '...'
    }

    let contentShort = news.content.slice(0, 50)
    if (contentShort.length === 50) {
      contentShort += '...'
    }

    return {
      id: news.id,
      titleShort,
      contentShort,
      imgUrl: news.imgUrl,
      user: {
        id: news.user?.id,
        firstName: news.user?.firstName,
        lastName: news.user?.lastName,
        gmail: news.user?.email
      },
      createdAt: news.createdAt,
      updatedAt: news.updatedAt
    }
  })

  return result
}

export const findOne = async (id: number) => {
  const news = await News.findOne({
    where: {
      id
    },
    relations: ['user']
  })

  if (!news) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'news not found!')
  }

  return {
    id: news.id,
    title: news.title,
    content: news.content,
    imgUrl: news.imgUrl,
    user: {
      id: news.user?.id,
      firstName: news.user?.firstName,
      lastName: news.user?.lastName,
      gmail: news.user?.email
    },
    createdAt: news.createdAt,
    updatedAt: news.updatedAt
  }
}

export const updateANews = async (news: News) => {
  await News.save(news)
}

export const searchNewsByTitle = async (title: string) => {
  const newsRecs = await News.find({
    where: {
      titleNoAccent: ILike(`%${title}%`)
    },
    order: {
      createdAt: 'DESC'
    }
  })

  const result = newsRecs.map(news => {
    let titleShort = news.title.slice(0, 40)
    if (titleShort.length === 40) {
      titleShort += '...'
    }

    let contentShort = news.content.slice(0, 50)
    if (contentShort.length === 50) {
      contentShort += '...'
    }

    return {
      id: news.id,
      titleShort,
      contentShort,
      imgUrl: news.imgUrl,
      user: {
        id: news.user?.id,
        firstName: news.user?.firstName,
        lastName: news.user?.lastName,
        gmail: news.user?.email
      },
      createdAt: news.createdAt,
      updatedAt: news.updatedAt
    }
  })

  return result
}

export const removeANews = async (id: number) => {
  await News.createQueryBuilder().softDelete().where('id = :id', { id }).execute()
}
