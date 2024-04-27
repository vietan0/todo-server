import jwt, { Secret } from 'jsonwebtoken';

export default function createToken(userId: string) {
  const token = jwt.sign(userId, process.env.JWT_SECRET as Secret);

  return token;
}
