import v1Route from './v1'
import { Router } from 'express'

const routes = Router()

routes.use('/v1', v1Route)

export default routes
