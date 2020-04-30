import { Request, Response, NextFunction } from 'express';
import bcryptS from '../../services/bcryptService';
import jwtS from '../../services/jwtService';
import db from '../../db/connection';
import { Register } from './index.d';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Creating User...');
  const { email, password, firstName, lastName }: Register = req.body;
  const hashedPass = await bcryptS.hashPass(password);
  const query = [email, hashedPass, firstName, lastName];

  try {
    db.query(
      'INSERT INTO users (email, password, first_name, last_name) VALUES($1, $2, $3, $4) RETURNING id',
      query,
      async (err, result) => {
        if (err) return next(err);
        console.log('result', result);
        const { id } = result.rows[0];
        const token = await jwtS.signToken(id);
        res.status(201).json(token);
      }
    );
  } catch (err) {
    return next(err);
  }
};
