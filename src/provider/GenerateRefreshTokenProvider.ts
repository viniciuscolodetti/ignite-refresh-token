import dayjs from 'dayjs';
import { client } from '../prisma/client';

class GenerateRefreshTokenProvider {
  async execute(userId: string) {
    const expiresIn = dayjs().add(15, 'second').unix();

    await client.refreshToken.deleteMany({
      where: {
        userId,
      },
    });

    const generateRefrsehToken = await client.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    });

    return generateRefrsehToken;
  }
}

export { GenerateRefreshTokenProvider }