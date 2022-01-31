import { FastifyInstance } from 'fastify';

import { User, UserType } from './user.model';

import service from './user.service';

/**
 * Iterface for an HTTP Request
 * @param id - user uuid
 */
interface IParams {
  id: UUIDType;
}

export default async (fastify: FastifyInstance) => {
  fastify.get('/users', {
    handler: async (_, reply) => {
      reply.code(200);
      const { db } = fastify;
      const result = await service.getAll(db);
      return result;
    },
  });

  fastify.get<{ Params: IParams }>('/users/:id', {
    handler: async (req, reply) => {
      const { id } = req.params;
      const { db } = fastify;
      reply.code(200);
      return service.getUser(db, id);
    },
  });

  fastify.post<{ Body: UserType }>('/users', {
    handler: async (req, reply) => {
      const { db } = fastify;
      const { body } = req;
      reply.code(201);
      return service.add(db, body);
    },
  });

  fastify.put<{ Params: IParams; Body: User }>('/users/:id', {
    handler: async (req, reply) => {
      const {
        params: { id },
        body,
      } = req;
      const { db } = fastify;
      reply.code(200);
      return service.update(db, id, body);
    },
  });

  fastify.delete<{ Params: IParams }>('/users/:id', {
    handler: async (req, reply) => {
      const {
        params: { id },
      } = req;
      const { db } = fastify;
      await service.remove(db, id);
      reply.code(204).send();
    },
  });
};
