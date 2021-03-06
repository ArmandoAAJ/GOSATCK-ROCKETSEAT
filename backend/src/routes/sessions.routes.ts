import { Router } from 'express';

import AuthUserServices from '../services/AuthUserServices';
const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authUser = new AuthUserServices();

    const { user, token } = await authUser.execute({
      email,
      password
    });

    return response.status(200).json({ user, token });
  } catch (err) {
    return response.status(400).json({
      error: err.message
    })
  }
})

export default sessionsRouter;
