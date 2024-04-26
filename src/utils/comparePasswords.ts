import bcrypt from 'bcrypt';

export default async function comparePasswords(
  plainPassword: string,
  hashed: string,
) {
  return bcrypt.compare(plainPassword, hashed);
}
