import { RequestHandler } from 'express';
import { createUserServices } from './users.service';

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await createUserServices(req.body);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
