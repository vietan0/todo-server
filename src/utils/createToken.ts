import type { Secret } from 'jsonwebtoken';
import process from 'node:process';
import jwt from 'jsonwebtoken';

export default function createToken(userId: string) {
  const token = jwt.sign(userId, process.env.JWT_SECRET as Secret);

  return token;
}
