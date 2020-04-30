import bcrypt from 'bcrypt';

export const hashPass = async (password: string): Promise<string> => {
  const SALT_ROUNDS = 10;
  const hashedPass = await bcrypt.hash(password, SALT_ROUNDS);
  return hashedPass;
};

export const validatePass = async (userPass: string, dbHash: string): Promise<boolean> => {
  const isValid = await bcrypt.compare(userPass, dbHash);
  return isValid;
};

const bcryptService = {
  hashPass,
  validatePass,
};

export default bcryptService;
