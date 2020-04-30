import { Request, Response, NextFunction } from 'express';
import bcryptS from '../../services/bcryptService';

import db from '../../db/connection';
import S from '../../services';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Logging in user');
  const { email, password } = req.body;

  try {
    db.query('SELECT from * users WHERE email = $1', email, async (err, result) => {
      if (err) return next(err);
      console.log('result', result);
      // if no user is found
      if (!result.rows.length) {
        return res.status(409).end();
      }
      const user = result.rows[0];
      const verified = await bcryptS.validatePass(password, user.password);
      // password incorrect
      if (!verified) {
        return res.status(403).end();
      }
      delete user.password;
      const token = await S.jwt.signToken(user.id);
      return res
        .status(200)
        .cookie('token', token)
        .end();
    });
  } catch (err) {
    return next(err);
  }
};

export const tokenLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = res.locals;

  try {
    db.query('SELECT from * users WHERE id = $1', id, async (err, result) => {
      if (err) return next(err);
      console.log('result', result);
      // if no user is found
      if (!result.rows.length) {
        return res.status(409).end();
      }
      const user = result.rows[0];
      delete user.password;
      return res.status(200).json(user);
    });
  } catch (err) {
    return next(err);
  }
};
