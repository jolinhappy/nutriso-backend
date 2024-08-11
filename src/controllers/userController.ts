import userService from '../services/userService';
import type { Request, Response } from 'express';

const createUser = async (req: Request, res: Response) => {
  const request = req.body;
  try {
    const user = await userService.createUser(request);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await userService.signInUser(email, password);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.code });
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
