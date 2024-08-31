import userService from '../services/userService';
import type { Request, Response } from 'express';
import { ApiResponse } from '../types/common';
import { SignInResponse } from '../types/user';

const createUser = async (req: Request, res: Response) => {
  const request = req.body;
  try {
    const user = await userService.createUser(request);
    const response: ApiResponse<SignInResponse | null> = {
      code: 200,
      message: 'Success',
    };
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userAccessToken = await userService.signInUser(email, password);
    if (userAccessToken) {
      const response: ApiResponse<SignInResponse | null | any> = {
        code: 200,
        message: 'Success',
        data: userAccessToken,
      };
      res.status(200).json(response);
    }
  } catch (error: any) {
    const errorResponse: ApiResponse<null> = {
      code: 401,
      message: error.code,
    };
    res.status(400).json(errorResponse);
  }
};

const logoutUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.signOutUser();
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ error });
  }
};

const getUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await userService.getAuthUser();
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ error });
  }
};

const getUserProfile = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await userService.getUserProfile(userId);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ error });
  }
};

export default { createUser, loginUser, logoutUser, getUser, getUserProfile };
