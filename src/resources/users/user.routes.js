'use strict';

const service = require('./user.service');

module.exports = async (fastify) => {
  fastify.get('/users', {
    handler: async (_, reply) => {
      reply.code(200);
      const users = await service.getAll();
      return users;
    },
  });

  fastify.get('/users/:id', {
    handler: async (req, reply) => {
      const { params } = req;
      reply.code(200);
      const user = await service.getUser(params.id);
      return user;
    },
  });

  fastify.post('/users', {
    handler: async (req, reply) => {
      reply.code(201);
      const user = await service.add(req.body);
      return user;
    },
  });

  fastify.put('/users/:id', {
    handler: async (req, reply) => {
      const {
        params: { id },
        body,
      } = req;
      reply.code(200);
      const renewed = await service.update(id, body);
      return renewed;
    },
  });

  fastify.delete('/users/:id', {
    handler: async (req, reply) => {
      const { params } = req;
      await service.remove(params.id);
      reply.code(204);
    },
  });
};
