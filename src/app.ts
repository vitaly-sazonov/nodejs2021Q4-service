import path from 'path';
import AutoLoad from 'fastify-autoload';
import { FastifyInstance, RouteShorthandOptions } from 'fastify';

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

  return fastify;
};
