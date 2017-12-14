import 'babel-polyfill';
import Router from 'koa-router';
import { baseApi } from '../config';
import UsersController from '../controllers/users';
import { adminOnly } from '../middlewares/authenticate';

const api = 'users';

const router = new Router();

router.prefix(`/${baseApi}/${api}`);


// POST /api/users
// This route is protected, call POST /api/authenticate to get the token
router.post('/', adminOnly, UsersController.add);

export default router;
