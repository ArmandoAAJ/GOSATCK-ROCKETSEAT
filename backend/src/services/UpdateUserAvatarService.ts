import User from '../models/Users';
import path from 'path';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import fs from 'fs';

import uploadConfig from '../config/upload';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authentication users can change avatar.', 401)
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const useravatarFileExist = await fs.promises.stat(userAvatarFilePath);

      if (useravatarFileExist) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await userRepository.save(user);

    return user;

  }
}

export default UpdateUserAvatarService;