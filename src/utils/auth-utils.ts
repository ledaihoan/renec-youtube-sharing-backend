import * as bcrypt from 'bcrypt';

export const SALT_ROUNDS = 10;

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePasswords = async (
  plainTextPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(plainTextPassword, hashedPassword);
};