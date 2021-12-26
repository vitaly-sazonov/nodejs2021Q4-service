import Fastify, { FastifyInstance } from 'fastify';

import config from './common/config';
import logger from './common/logger';
import app from './app';

const { PORT } = config;

const fastify: FastifyInstance = Fastify({
  logger,
});

app(fastify, {})
  .then((server) => server.listen(Number(PORT), () => console.log(`App is running on http://localhost:${PORT}`)))
  .catch(console.error);

process.on('uncaughtException', (err) => {
  console.error('unhandledRejection event, see error.log');
  fastify.log.fatal({ msg: 'uncaughtException event', err });
  process.exit(1);
});

process.on('unhandledRejection', () => {
  console.error('unhandledRejection event, see error.log');
  fastify.log.fatal({ msg: 'unhandledRejection event' });
  process.exit(1);
});

// Promise.reject(Error('PROM! Oops!'));

// throw Error('Oops!');
