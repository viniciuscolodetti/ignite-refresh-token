import { sign } from 'jsonwebtoken';

class GenerateTokenProvider {
  async execute(userId: string) {
    const token = sign({}, '5414a200-c5ed-4788-91a8-b412dc148c8b', {
      subject: userId,
      expiresIn: '20s'
    });

    return token;
  }
}

export { GenerateTokenProvider }