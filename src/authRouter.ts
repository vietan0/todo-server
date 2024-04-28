import { Router } from 'express';

import signIn from './handlers/signIn.js';
import signUp from './handlers/signUp.js';
import validateAuth from './middlewares/validateAuth.js';

const authRouter = Router();
authRouter.post('/signup', validateAuth, signUp);
authRouter.post('/signin', validateAuth, signIn);

export default authRouter;
