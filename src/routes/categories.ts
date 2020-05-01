import express from 'express';
import * as Categories from '../controllers/Categories/category-controller';
const router = express.Router();

router.get('/', Categories.getCategories);

export default router;
