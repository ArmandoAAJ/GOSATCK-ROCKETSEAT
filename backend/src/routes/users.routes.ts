import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';
import ensureAuth from '../middlewares/ensureAuth';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRoutes = Router();
const upload = multer(uploadConfig);

usersRoutes.post('/', async (request, response) => {
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
})

usersRoutes.patch('/avatar', ensureAuth, upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const { id, name, email, created_at, updated_at, avatar } = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.status(200).json({
      id,
      name,
      email,
      avatar,
      created_at,
      updated_at
    });
  },
);

export default usersRoutes;
