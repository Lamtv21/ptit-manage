import { Router } from 'express'
import {
  createNewsController,
  getAllNewsController,
  getANewsController,
  removeANewsController,
  searchNewsController,
  updateANewsController
} from '../../controller/news/news.controller'
import validate from '../../middleware/validate.middleware'
import {
  validateCreateNews,
  validateGetANews,
  validateSearchListNews,
  validateUpdateANews
} from '../../validate/news.validate'
import verifyToken from '../../middleware/auth.middleware'

const routes = Router()

//@access private
//@desc create a news
//@route api/v1/news/
routes.route('/').post(verifyToken, validate(validateCreateNews), createNewsController)

//@access private
//@desc get all news
//@route api/v1/news/
routes.route('/').get(verifyToken, getAllNewsController)

//@access private
//@desc update a news
//@route api/v1/news/search?title
routes.route('/search').get(verifyToken, validate(validateSearchListNews), searchNewsController)

//@access private
//@desc get a news details
//@route api/v1/news/:id
routes.route('/:id').get(verifyToken, validate(validateGetANews), getANewsController) 

//@access private
//@desc update a news
//@route api/v1/news/:id
routes.route('/:id').put(verifyToken, validate(validateUpdateANews), updateANewsController)

//@access private
//@desc update a news
//@route api/v1/news/:id
routes.route('/:id').delete(verifyToken, validate(validateGetANews), removeANewsController)

export default routes
