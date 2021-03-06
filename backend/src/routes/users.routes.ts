import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRoutes = Router();

usersRoutes.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const CreateUser = new CreateUserService();

    const { id, created_at, updated_at } = await CreateUser.execute({
      name,
      email,
      password,
    });

    return response.status(200).json({
      id,
      name,
      email,
      created_at,
      updated_at
    });
  } catch (err) {
    return response.status(400).json({
      error: err.message
    })
  }
})

export default usersRoutes;
