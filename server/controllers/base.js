import Course from '../models/courses';
import fs from 'fs';
import path from 'path';
import { readFile } from '../utils/utils';

class BaseController {
  /* eslint-disable no-param-reassign */

  /**
   * Get index.html
   * @param ctx
   */
  async home(ctx) {
    const page = await readFile(path.join(__dirname, '../../client/index.html'), 'utf8');
    ctx.body = page;
  }
  /* eslint-enable no-param-reassign */
}

export default new BaseController();
