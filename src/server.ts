import Fastify, { FastifyInstance } from 'fastify';

import config from './common/config';
import app from './app';

const fastify: FastifyInstance = Fastify({});
const { PORT } = config;

app(fastify, {})
  .then((server) => server.listen(Number(PORT), () => console.log(`App is running on http://localhost:${PORT}`)))
  .catch(console.error);
