import 'babel-polyfill';
import Router from 'koa-router';
import { baseApi } from '../config';
import jwt from '../middlewares/jwt';
import CoursesController from '../controllers/courses';

const api = 'courses';

const router = new Router();

router.prefix(`/${baseApi}/${api}`);

// GET /api/courses
router.get('/', CoursesController.find);

// POST /api/courses
// This route is protected, call POST /api/authenticate to get the token
router.post('/', jwt, CoursesController.add);

// GET /api/courses/id
// This route is protected, call POST /api/authenticate to get the token
router.get('/:id', jwt, CoursesController.findById);

// PUT /api/courses/id
// This route is protected, call POST /api/authenticate to get the token
router.put('/:id', jwt, CoursesController.update);

// DELETE /api/courses/id
// This route is protected, call POST /api/authenticate to get the token
router.delete('/:id', jwt, CoursesController.delete);

export default router;
