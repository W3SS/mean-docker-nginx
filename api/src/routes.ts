import { NextFunction, Request, Response, Router } from 'express'

import userController from './controllers/UserController'

const routes = Router()

routes.get("/", (res) => {
  res.json({
    status: "API Its Working",
    message: "Welcome to RESTHub crafted with love!"
  })
})

const catchError = (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fn(req, res)
    next()
  } catch (error) {
    next(error)
  }
}

// User
routes
  .route('/users')
  .get(catchError(userController.index))
  .post(catchError(userController.store))



export default routes



