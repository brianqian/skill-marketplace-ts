import path from 'path';
import compress from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import routes from './routes';
import asyncHandler from './utils/asyncHandler';

const app = express();
const PORT = process.env.PORT || 3001;
const isDev = process.env.NODE_ENV || 'development';
// Enable security, CORS, compression, favicon and body parsing

app.use(morgan('dev'));
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(
  '*',
  (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('CUSTOM ERROR', err);
    return next(err);
  }
);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
  console.log(`Running in ${isDev} mode`);
});

export default app;
