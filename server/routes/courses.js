import 'babel-polyfill';
import Router from 'koa-router';
import { baseApi } from '../config';
import CoursesController from '../controllers/courses';
import { authOnly, adminOnly} from '../middlewares/authenticate';

const api = 'courses';

const router = new Router();

router.prefix(`/${baseApi}/${api}`);

// GET /api/courses
router.get('/', authOnly, CoursesController.find);

// POST /api/courses
// This route is protected, call POST /api/authenticate to get the token
router.post('/', adminOnly, CoursesController.add);

// GET /api/courses/id
// This route is protected, call POST /api/authenticate to get the token
router.get('/:id', authOnly, CoursesController.findById);

// PUT /api/courses/id
// This route is protected, call POST /api/authenticate to get the token
router.put('/:id', adminOnly, CoursesController.update);

// DELETE /api/courses/id
// This route is protected, call POST /api/authenticate to get the token
router.delete('/:id', adminOnly, CoursesController.delete);

// PUT /api/courses/id/modules
// This route is protected, call POST /api/authenticate to get the token
router.put('/:id/modules', adminOnly, CoursesController.addModule);

export default router;
