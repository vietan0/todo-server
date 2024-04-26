import { Router } from 'express';

import signIn from './handlers/signIn.js';
import signUp from './handlers/signUp.js';

const authRouter = Router();
authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);

export default authRouter;
