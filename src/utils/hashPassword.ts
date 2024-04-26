import bcrypt from 'bcrypt';

export default async function hashPassword(plainPassword: string) {
  return bcrypt.hash(plainPassword, 5);
}
