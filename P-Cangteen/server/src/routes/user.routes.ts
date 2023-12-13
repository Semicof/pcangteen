import { Router } from "express";
import * as userController from '../controllers/user.controllers'
import { verifyToken } from "~/middlewares";

const userRouter = Router()

userRouter.get('/', userController.getProfile)
userRouter.get('/all', userController.getAllUser)
userRouter.get('/:id', userController.getUser)
userRouter.post('/login', userController.login)
userRouter.get('/search/:key', userController.searchUser)
userRouter.post('/', userController.createUser)

export default userRouter