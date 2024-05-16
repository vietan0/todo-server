import { RequestHandler } from 'express';

const signOut: RequestHandler = async (_req, res, next) => {
  try {
    res.clearCookie('token');
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
};

export default signOut;
