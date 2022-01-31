import { FastifyInstance } from 'fastify';

import { BoardType } from './board.model';
import service from './board.service';

/**
 * Iterface for an HTTP Request
 * @param id - board uuid
 */
interface IParams {
  id: UUIDType;
}

export default async (fastify: FastifyInstance) => {
  fastify.get('/boards', {
    handler: async (_, reply) => {
      reply.code(200);
      const tasks = await service.getAll(fastify.db);
      return tasks;
    },
  });

  fastify.get<{ Params: IParams }>('/boards/:id', {
    handler: async (req, reply) => {
      const { id } = req.params;

      reply.code(200);
      const tasks = service.getBoard(fastify.db, id);
      return tasks;
    },
  });

  fastify.post<{ Body: BoardType }>('/boards', {
    handler: async (req, reply) => {
      const { body } = req;
      reply.code(201);
      const tasks = service.add(fastify.db, body);
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
      const renewed = service.update(fastify.db, id, body);
      return renewed;
    },
  });

  fastify.delete<{ Params: IParams }>('/boards/:id', {
    handler: async (req, reply) => {
      const { id } = req.params;
      await service.remove(fastify.db, id);
      reply.code(204);
    },
  });
};
