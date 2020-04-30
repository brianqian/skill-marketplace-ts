import jwt from 'jsonwebtoken';
import createError from 'http-errors';

const { JWT_SECRET } = process.env;
if (!JWT_SECRET) throw createError(500, 'Error with Env variables');

const signToken = async (userId: string) => {
  const token = await jwt.sign(userId, JWT_SECRET);
  return token;
};

const verifyToken = async (token: string) => {
  try {
    const verified = await jwt.verify(token, JWT_SECRET);
    return verified;
  } catch (err) {
    throw createError(500, 'Error with jsonwebtoken');
  }
};

const jwtService = {
  signToken,
  verifyToken,
};
export default jwtService;
