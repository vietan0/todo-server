import { Router } from 'express';

import signIn from './handlers/signIn.js';
import signOut from './handlers/signOut.js';
import signUp from './handlers/signUp.js';
import validateAuth from './middlewares/validateAuth.js';

const authRouter = Router();
authRouter.post('/signup', validateAuth, signUp);
authRouter.post('/signin', validateAuth, signIn);
authRouter.post('/signout', signOut);

export default authRouter;
