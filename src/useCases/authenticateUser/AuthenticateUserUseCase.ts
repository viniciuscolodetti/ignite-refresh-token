import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { client } from '../../prisma/client';
import { GenerateRefreshTokenProvider } from '../../provider/GenerateRefreshTokenProvider';
import { GenerateTokenProvider } from '../../provider/GenerateTokenProvider';

interface IRequest {
  username: string;
  password: string;
}

class AuthenticateUserUseCase {
  async execute({ username, password }: IRequest) {
    const user = await client.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      throw new Error('User or password incorrect');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('User or password incorrect');
    }

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(user.id);
    
    const generateRefrsehTokenProvider = new GenerateRefreshTokenProvider();
    const refreshToken = await generateRefrsehTokenProvider.execute(user.id);

    return { token, refreshToken };
  }
}

export { AuthenticateUserUseCase }