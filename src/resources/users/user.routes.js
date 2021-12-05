'use strict';

const service = require('./user.service');

// User (/users route)
// GET /users - get all users (remove password from response)
// GET /users/:userId - get the user by id (ex. “/users/123”) (remove password from response)
// POST /users - create user
// PUT /users/:userId - update user
// DELETE /users/:userId - delete user

module.exports = async (fastify) => {
  fastify.get('/', {
    schema: {
      response: {
        200: {
          type: 'array',
        },
      },
    },
    handler: async (_, reply) => {
      reply.code(200);
      const users = await service.getAll();
      return users;
    },
  });

  fastify.get('/:id', {
    // schema: {
    //   response: {
    //     200: {
    //       type: 'array',
    //     },
    //   },
    // },
    handler: async (req, reply) => {
      const { params } = req;
      reply.code(200);
      const user = await service.getUser(params.id);
      return user;
    },
  });

  fastify.post('/', {
    // schema: {
    //   response: {
    //     type: 'object',

    //     201: {
    //       type: 'array',
    //     },
    //   },
    // },
    handler: async (req, reply) => {
      reply.code(201);
      const user = await service.add(req.body);
      return user;
    },
  });

  fastify.put('/:id', {
    // schema: {
    //   response: {
    //     200: {
    //       type: 'array',
    //     },
    //   },
    // },
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

  fastify.delete('/:id', {
    // schema: {
    //   response: {
    //     200: {
    //       type: 'array',
    //     },
    //   },
    // },
    handler: async (req, reply) => {
      const { params } = req;
      await service.remove(params.id);
      reply.code(204);
    },
  });
};
