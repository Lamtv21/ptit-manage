import authRoute from './auth.route'
import userRoute from './user.route'
import newsRoute from './news.route'
import { Router } from 'express'

const routes = Router()

routes.use('/auth', authRoute)
routes.use('/user', userRoute)
routes.use('/news', newsRoute)

export default routes
