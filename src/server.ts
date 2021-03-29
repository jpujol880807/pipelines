import 'dotenv/config';
import App from './app';
import AuthRoute from './routes/auth.route';
import IndexRoute from './routes/index.route';
import UsersRoute from './routes/users.route';
import validateEnv from './utils/validateEnv';
import PipelinesRoute from './routes/pipelines.route';
import DevicesRoute from './routes/devices.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new PipelinesRoute(),
  new DevicesRoute()
]);

app.listen();
