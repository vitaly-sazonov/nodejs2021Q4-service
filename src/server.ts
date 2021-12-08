import Fastify, { FastifyInstance } from 'fastify';

import config from './common/config';
import app from './app';

const fastify: FastifyInstance = Fastify({});
app(fastify, {})
  .then((fastify) => fastify.listen(Number(4000), () => console.log(`App is running on http://localhost:${config.PORT}`)))
  .catch(console.error);
