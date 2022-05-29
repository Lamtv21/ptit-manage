import { Router } from 'express'
import verifyToken from '../../middleware/auth.middleware'
import {
  changePasswordController,
  forgotPasswordController,
  refreshTokenController,
  registerUserController,
  resetPasswordController,
  userLoginController
} from '../../controller/auth/auth.controller'
import validate from '../../middleware/validate.middleware'
import {
  validateChangePassword,
  validateForgotPassword,
  validateLogin,
  validateRefreshToken,
  validateRegisterAccount,
  validateResetPassword
} from '../../validate/auth.validate'

const routes = Router()

//@access public
//@desc login with email and password
//@route api/v1/auth/login
routes.route('/login').post(validate(validateLogin), userLoginController)

//@access private
//@desc manager register account
//@route api/v1/auth/register
routes.route('/register').post(verifyToken, validate(validateRegisterAccount), registerUserController)

//@access private
//@desc change password of current user
//@route api/v1/auth/register
routes.route('/change-password').patch(verifyToken, validate(validateChangePassword), changePasswordController)

//@access public
//@desc get new access token
//@route api/v1/auth/refresh-token
routes.route('/refresh-token').post(validate(validateRefreshToken), refreshTokenController)

//@access public
//@desc send email forgot password for user
//@route api/v1/auth/refresh-token
routes.route('/forgot-password').post(validate(validateForgotPassword), forgotPasswordController)

//@access public
//@desc reset password
//@route api/v1/auth/reset-password
routes.route('/reset-password').patch(validate(validateResetPassword), resetPasswordController)

export default routes
