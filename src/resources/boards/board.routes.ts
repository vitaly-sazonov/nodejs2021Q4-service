import { FastifyInstance } from 'fastify';

import { BoardType } from './board.model';
import service from './board.service';

/**
 * Iterface for an HTTP Request
 * @param id - user uuid
 */
interface IParams {
  id: UUIDType;
}

export default async (fastify: FastifyInstance) => {
  fastify.get('/boards', {
    handler: async (_, reply) => {
      reply.code(200);
      const tasks = await service.getAll();
      return tasks;
    },
  });

  fastify.get<{ Params: IParams }>('/boards/:id', {
    handler: async (req, reply) => {
      const { id } = req.params;

      reply.code(200);
      const tasks = service.getBoard(id);
      return tasks;
    },
  });

  fastify.post<{ Body: BoardType }>('/boards', {
    handler: async (req, reply) => {
      const { body } = req;
      reply.code(201);
      const tasks = service.add(body);
      return tasks;
    },
  });

  fastify.put<{ Params: IParams; Body: BoardType }>('/boards/:id', {
    handler: async (req, reply) => {
      const {
        params: { id },
        body,
      } = req;
      reply.code(200);
      const renewed = service.update(id, body);
      return renewed;
    },
  });

  fastify.delete<{ Params: IParams }>('/boards/:id', {
    handler: async (req, reply) => {
      const { id } = req.params;
      service.remove(id);
      reply.code(204);
    },
  });
};
