import User from '../models/users';

class UsersController {
  /* eslint-disable no-param-reassign */

  /**
   * Get all users
   * @param {ctx} Koa Context
   */
  async find(ctx) {
    ctx.body = await User.find();
  }

  /**
   * Find a user
   * @param {ctx} Koa Context
   */
  async findById(ctx) {
    try {
      const user = await User.findById(ctx.params.id);
      if (!user) {
        ctx.throw(404);
      }
      ctx.body = user;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }

  /**
   * Add a user
   * @param {ctx} Koa Context
   */
  async add(ctx) {
    try {
      const userInstance = new User(ctx.request.body);

      const user = await userInstance.save();
      ctx.body = user;
    } catch (err) {
      ctx.throw(422);
    }
  }

  /**
   * Update a user
   * @param {ctx} Koa Context
   */
  async update(ctx) {
    try {
      const user = await User.findByIdAndUpdate(
        ctx.params.id,
        ctx.request.body
      );
      if (!user) {
        ctx.throw(404);
      }
      ctx.body = user;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }

  /**
   * Delete a user
   * @param {ctx} Koa Context
   */
  async delete(ctx) {
    try {
      const user = await User.findByIdAndRemove(ctx.params.id);
      if (!user) {
        ctx.throw(404);
      }
      ctx.body = user;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }

    /**
     * Update a user
     * @param {ctx} Koa Context
     */
    async addModule(ctx) {
        try {
            const userInstance = await User.findById(ctx.params.id);
            userInstance.modules.push({ name: ctx.request.body.name });

            const user = await userInstance.save();
            ctx.body = user;
            if (!user) {
                ctx.throw(404);
            }
            ctx.body = user;
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.throw(500);
        }
    }

  /* eslint-enable no-param-reassign */
}

export default new UsersController();