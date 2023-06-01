import { Request, Response } from 'express'
import { createUserServices } from './users.service'

export const createUser = async (req: Request, res: Response) => {
  try {
    const result = await createUserServices(req.body)
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      sucess: false,
      message: 'Failed to create user',
      error: error,
    })
  }
}
