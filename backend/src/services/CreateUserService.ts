import User from '../models/Users';
import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm'

interface RequestDTO {
  name: string;
  email: string;
  password: string,
}

class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: {
        email: email
      }
    });

    if (checkUserExists) throw Error('Email adress already used.');
    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword, 
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;