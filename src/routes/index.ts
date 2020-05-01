import auth from './auth';
import courses from './courses';
import users from './users';
import categories from './categories';
import express from 'express';

const router = express.Router();

router.use('/session', auth);
router.use('/courses', courses);
router.use('/users', users);
router.use('/categories', categories);

export default router;
