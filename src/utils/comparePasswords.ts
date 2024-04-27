import bcrypt from 'bcrypt';

export default async function comparePasswords(
  plainPassword: string,
  hashed: string,
) {
  const result = await bcrypt.compare(plainPassword, hashed);
  if (!result) throw new Error('Password is incorrect');

  return;
}
