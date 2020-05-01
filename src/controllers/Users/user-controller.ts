import { Request, Response, NextFunction } from 'express';
import S from '../../services';
import db from '../../db/connection';
import { Register } from '.';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Creating User...');
  const { email, password, firstName, lastName }: Register = req.body;
  const hashedPass = await S.bcrypt.hashPass(password);
  const query = [email, hashedPass, firstName, lastName];

  try {
    db.query(
      'INSERT INTO users (email, password, first_name, last_name) VALUES($1, $2, $3, $4) RETURNING id',
      query,
      async (err, result) => {
        if (err) return next(err);
        console.log('result', result);
        const { id } = result.rows[0];
        const token = await S.jwt.signToken(id);
        res.status(201).cookie('token', token);
      }
    );
  } catch (err) {
    return next(err);
  }
};
