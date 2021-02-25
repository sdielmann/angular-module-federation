import jsonServer from 'json-server';
import { Database } from './db/database';
import { expressLogger, logger } from './util';

logger.info('Starting mocked backend server...');

const port = 9080;
const server = jsonServer.create();
const db = new Database();
const router = jsonServer.router(db.getPlainDatabase());

// Customize the ID property that is used by the JSON Server internally to identify the objects
// @ts-ignore
router.db._.id = '_id';

// General middleware
server.use(expressLogger);
server.use(jsonServer.bodyParser);
server.use(jsonServer.defaults({logger: false}));

// Routers and actual data
server.use(router);

server.listen(port, () => {
  logger.info(`Mocked backend is running on http://localhost:${port}.`);
});
