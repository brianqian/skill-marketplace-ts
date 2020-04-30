import express from 'express';
import * as Users from '../controllers/Users/userController';

const router = express.Router();

router.post('/register', Users.createUser);

export default router;
