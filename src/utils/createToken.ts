import jwt, { Secret } from 'jsonwebtoken';

export default function createToken(id: string) {
  const token = jwt.sign(id, process.env.JWT_SECRET as Secret);

  return token;
}
