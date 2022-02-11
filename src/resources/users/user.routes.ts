import { FastifyInstance } from 'fastify';
import { UserType } from './user.model';

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
      return service.getAll();
    },
  });

  fastify.get<{ Params: IParams }>('/users/:id', {
    handler: async (req, reply) => {
      const { id } = req.params;
      reply.code(200);
      return service.getUser(id);
    },
  });

  fastify.post<{ Body: UserType }>('/users', {
    handler: async (req, reply) => {
      const { body } = req;
      reply.code(201);
      return service.add(body);
    },
  });

  fastify.put<{ Params: IParams; Body: UserType }>('/users/:id', {
    handler: async (req, reply) => {
      const {
        params: { id },
        body,
      } = req;
      reply.code(200);
      return service.update(id, body);
    },
  });

  fastify.delete<{ Params: IParams }>('/users/:id', {
    handler: async (req, reply) => {
      const {
        params: { id },
      } = req;
      service.remove(id);
      reply.code(204).send();
    },
  });
};
