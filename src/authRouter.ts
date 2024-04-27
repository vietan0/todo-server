import { Router } from 'express';

import signIn from './handlers/signIn.js';
import signUp from './handlers/signUp.js';
import validate from './middlewares/validate.js';

const authRouter = Router();
authRouter.post('/signup', validate, signUp);
authRouter.post('/signin', validate, signIn);

export default authRouter;
