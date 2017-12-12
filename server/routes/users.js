import 'babel-polyfill';
import Router from 'koa-router';
import { baseApi } from '../config';
import jwt from '../middlewares/jwt';
import UsersController from '../controllers/users';

const api = 'users';

const router = new Router();

router.prefix(`/${baseApi}/${api}`);


// POST /api/users
// This route is protected, call POST /api/authenticate to get the token
//todo add validation
router.post('/', jwt, UsersController.add);

export default router;
