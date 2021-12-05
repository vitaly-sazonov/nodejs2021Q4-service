'use strict';

const path = require('path');
const AutoLoad = require('fastify-autoload');

module.exports = async (fastify, opts) => {
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
};
