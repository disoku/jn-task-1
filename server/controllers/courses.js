import Course from '../models/courses';

class CoursesController {
  /* eslint-disable no-param-reassign */

  /**
   * Get all courses
   * @param {ctx} Koa Context
   */
  async find(ctx) {
    ctx.body = await Course.find();
  }

  /**
   * Find a course
   * @param {ctx} Koa Context
   */
  async findById(ctx) {
    try {
      const course = await Course.findById(ctx.params.id);
      if (!course) {
        ctx.throw(404);
      }
      ctx.body = course;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }

  /**
   * Add a course
   * @param {ctx} Koa Context
   */
  async add(ctx) {
    try {
      const courseInstance = new Course(ctx.request.body);
      console.log(courseInstance);
        courseInstance.modules.push({ name: 'My comment' });

        const course = await courseInstance.save();
      ctx.body = course;
    } catch (err) {
      ctx.throw(422);
    }
  }

  /**
   * Update a course
   * @param {ctx} Koa Context
   */
  async update(ctx) {
    try {
      const course = await Course.findByIdAndUpdate(
        ctx.params.id,
        ctx.request.body
      );
      if (!course) {
        ctx.throw(404);
      }
      ctx.body = course;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }

  /**
   * Delete a course
   * @param {ctx} Koa Context
   */
  async delete(ctx) {
    try {
      const course = await Course.findByIdAndRemove(ctx.params.id);
      if (!course) {
        ctx.throw(404);
      }
      ctx.body = course;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }

    /**
     * Update a course
     * @param {ctx} Koa Context
     */
    async addModule(ctx) {
        try {
            const courseInstance = await Course.findById(ctx.params.id);
            courseInstance.modules.push({ name: ctx.request.body.name });

            const course = await courseInstance.save();
            ctx.body = course;
            if (!course) {
                ctx.throw(404);
            }
            ctx.body = course;
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.throw(500);
        }
    }

  /* eslint-enable no-param-reassign */
}

export default new CoursesController();
