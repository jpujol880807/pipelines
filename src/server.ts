import 'dotenv/config';
import App from './app';
import IndexRoute from './routes/index.route';
import validateEnv from './utils/validateEnv';
import PipelinesRoute from './routes/pipelines.route';
import DevicesRoute from './routes/devices.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new PipelinesRoute(),
  new DevicesRoute()
]);

app.listen();
