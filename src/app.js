'use strict';

const path = require('path');
const AutoLoad = require('fastify-autoload');

module.exports = async (fastify, opts) => {
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'resources'),
    maxDepth: 3,
    indexPattern: /.*\.routes(\.ts|\.js|\.cjs|\.mjs)$/,
    options: {
      ...opts,
    },
  });
};
