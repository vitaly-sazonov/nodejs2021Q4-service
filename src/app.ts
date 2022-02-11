import path from 'path';
import AutoLoad from 'fastify-autoload';
import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { ResourceError } from './common/errors';

export default async (fastify: FastifyInstance, opts: RouteShorthandOptions): Promise<FastifyInstance> => {
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

  fastify.addHook('onError', async (_, reply, error) => {
    if (error instanceof ResourceError) {
      reply.code(error.code).send(error.message);
      return;
    }
    throw error;
  });

  return fastify;
};
