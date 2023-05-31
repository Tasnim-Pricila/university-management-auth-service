import express from 'express'
import { createUser } from './users.controller'
const userRouter = express.Router()

userRouter.post('/create-user', createUser)
// userRouter.get('/', createUser)

export default userRouter
