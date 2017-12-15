import 'babel-polyfill';
import Router from 'koa-router';
import BaseController from '../controllers/base';

const router = new Router();

router.prefix(`/`);

// GET /
router.get('/', BaseController.home);

export default router;
