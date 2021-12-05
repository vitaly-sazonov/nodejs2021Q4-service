'use strict';

const wrapError = require('../../common/wrapError');

const service = require('./board.service');

module.exports = async (fastify) => {
  fastify.get('/boards', {
    handler: async (_, reply) => {
      reply.code(200);
      const tasks = await service.getAll();
      return tasks;
    },
  });

  fastify.get('/boards/:id', {
    handler: wrapError(async (req, reply) => {
      const { params } = req;

      reply.code(200);
      const tasks = await service.getBoard(params.id);
      return tasks;
    }),
  });

  fastify.post('/boards', {
    handler: async (req, reply) => {
      reply.code(201);
      const tasks = await service.add(req.body);
      return tasks;
    },
  });

  fastify.put('/boards/:id', {
    handler: wrapError(async (req, reply) => {
      const {
        params: { id },
        body,
      } = req;
      reply.code(200);
      const renewed = await service.update(id, body);
      return renewed;
    }),
  });

  fastify.delete('/boards/:id', {
    handler: async (req, reply) => {
      const { params } = req;
      await service.remove(params.id);
      reply.code(204);
    },
  });
};
