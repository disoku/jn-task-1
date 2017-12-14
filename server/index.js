import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import logger from 'koa-logger';
import session from 'koa-session';
import mongoose from 'mongoose';

import routing from './routes/';
import { port, connexionString } from './config';

mongoose.connect(connexionString, {
    useMongoClient: true,
    /* other options */
});

mongoose.connection.on('error', console.error);

// Create Koa Application
const app = new Koa();

app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
};

app
  .use(session(CONFIG, app))
  .use(logger())
  .use(bodyParser())
  .use(helmet());

routing(app);

// Start the application
app.listen(port, () =>
  console.log(`✅  The server is running at http://localhost:${port}/`)
);
export default app;
