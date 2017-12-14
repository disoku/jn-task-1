import bcrypt from 'bcrypt';
import User from '../models/users';

const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

// todo use jwt for authenticate
export default async ctx => {
  const { username, password } = ctx.request.body;
  const user = await User.findOne({username});
  const isAuthenticated = user && await bcrypt.compare(password, user.password);
  console.log(`${username} ${password} `, isAuthenticated);
  if (isAuthenticated) {
    ctx.status = 200;
    ctx.body = {
      message: 'Successful Authentication',
    };
    ctx.session.user = user;
  } else {
    ctx.status = 401;
    ctx.body = {
      message: 'Authentication Failed',
    };
  }
  return ctx;
};

export const adminOnly = (ctx, next) => {
  const { user } = ctx.session;
  if (user && user.role === ROLES.ADMIN) {
    return next();
  }
  ctx.status = 403;
  ctx.body = 'permission denied';
};

export const authOnly = (ctx, next) => {
  const { user } = ctx.session;
  if (user) {
    return next();
  }
  ctx.status = 403;
  ctx.body = 'permission denied';
};

