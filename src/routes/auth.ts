import express from 'express';
import * as Users from '../controllers/Users/user-controller';

const router = express.Router();

router.post('/register', Users.createUser);

export default router;
