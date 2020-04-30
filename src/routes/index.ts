import auth from './auth';
import courses from './courses';
import users from './users';
import express from 'express';

const router = express.Router();

router.use('/auth', auth);
router.use('/courses', courses);
router.use('/users', users);

export default router;
