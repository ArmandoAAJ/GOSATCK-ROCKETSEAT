import User from '../models/Users';
import { compare } from 'bcryptjs';
import auth from '../config/auth';
import { getRepository } from 'typeorm'
import { sign } from 'jsonwebtoken';

interface Request {
  email: string,
  password: string,
}

interface Response {
  user: User;
  token: string;
}

class AuthUserServices {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email: email }
    });

    if (!user) throw Error('Incorrect email/password combination.');

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) throw Error('Incorrect email/password combination.');

    const token = sign({}, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn
    });

    return { user, token }

  }
}

export default AuthUserServices;