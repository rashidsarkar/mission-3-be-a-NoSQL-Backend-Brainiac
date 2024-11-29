import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, student: studentData } = req.body;

    const result = await UserService.createStudentIntoDb(password, studentData);
    res.status(200).json({
      success: true,
      message: 'User is created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const UserControler = {
  createUser,
};
