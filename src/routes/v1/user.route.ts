import { Router } from 'express'
import {
  getAllUsersController,
  getMeController,
  getUserController,
  updateCurrentUserInfoController,
  updateUserInfoController
} from '../../controller/user/user.controller'
import verifyToken from '../..//middleware/auth.middleware'
import validate from '../../middleware/validate.middleware'
import { validateGetUser, validateUpdateCurrentInfoUser, validateUpdateInfoUser } from '../../validate/user.validate'

const routes = Router()

//@access private
//@desc get full info of current user
//@route api/v1/user/me
routes.route('/me').get(verifyToken, getMeController)

//@access private
//@desc update info of current user
//@route api/v1/user/me
routes.route('/me').put(verifyToken, validate(validateUpdateCurrentInfoUser), updateCurrentUserInfoController)

//@access private
//@desc update info of user
//@route api/v1/user/:id
routes.route('/:id').put(verifyToken, validate(validateUpdateInfoUser), updateUserInfoController)

//@access private
//@desc get all users
//@route api/v1/user/
routes.route('/').get(verifyToken, getAllUsersController)

//@access private
//@desc get info user by id
//@route api/v1/user/:id
routes.route('/:id').get(verifyToken, validate(validateGetUser), getUserController)

export default routes
