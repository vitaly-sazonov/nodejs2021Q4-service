import path from 'path';
import AutoLoad from 'fastify-autoload';
import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { createConnection } from 'typeorm';

import ormconfig from './ormconfig';
import { ResourceError } from './common/errors';

import authenticate from './common/authenticate';

export default async (fastify: FastifyInstance, opts: RouteShorthandOptions): Promise<FastifyInstance> => {
  //! register routes
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'resources/users'),
    maxDepth: 3,
    indexPattern: /.*\.routes(\.ts|\.js|\.cjs|\.mjs)$/,
    options: {
      ...opts,
    },
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'resources/boards'),
    maxDepth: 3,
    indexPattern: /.*\.routes(\.ts|\.js|\.cjs|\.mjs)$/,
    options: {
      ...opts,
    },
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'resources/tasks'),
    maxDepth: 3,
    indexPattern: /.*\.routes(\.ts|\.js|\.cjs|\.mjs)$/,
    options: {
      ...opts,
    },
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'resources/login'),
    maxDepth: 3,
    indexPattern: /.*\.routes(\.ts|\.js|\.cjs|\.mjs)$/,
    options: {
      ...opts,
    },
  });

  //! register JWT authenticate

  fastify.register(authenticate);

  //! register db connection
  const db = await createConnection(ormconfig);
  fastify.decorate('db', db);

  fastify.addHook('onError', async (_, reply, error) => {
    if (error instanceof ResourceError) {
      reply.code(error.code).send(error.message);
      return;
    }
    throw error;
  });

  //! register logging body
  fastify.addHook('preHandler', (req, reply, done) => {
    if (req.body) {
      req.log.info({ body: req.body }, 'parsed body');
    }
    done();
  });

  return fastify;
};
