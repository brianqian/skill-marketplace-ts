import { Request, Response, NextFunction } from 'express';
import db from '../../db/connection';

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    db.query('SELECT * from categories', async (err, result) => {
      if (err) return next(err);
      console.log('get categories', result);
      res.status(200).json(result.rows);
    });
  } catch (err) {
    return next(err);
  }
};
