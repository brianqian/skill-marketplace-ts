import { Request, Response, NextFunction } from 'express';

const catchAsyncError = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsyncError;
