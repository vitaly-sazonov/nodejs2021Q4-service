import { FastifyInstance } from 'fastify';

import service from './tasks.service';

import { TaskType } from './tasks.model';

/**
 * Iterface for an HTTP Request
 * @param id - task uuid
 * @param boardId - board uuid
 */
interface IParams {
  id: UUIDType;
  boardId: UUIDType;
}

export default async (fastify: FastifyInstance) => {
  fastify.get<{ Params: IParams }>('/boards/:boardId/tasks', {
    handler: async (req, reply) => {
      const {
        params: { boardId },
      } = req;
      reply.code(200);
      const tasks = service.getAll(boardId);
      return tasks;
    },
  });

  fastify.get<{ Params: IParams }>('/boards/:boardId/tasks/:id', {
    handler: async (req, reply) => {
      const { boardId, id } = req.params;
      reply.code(200);
      const tasks = service.getTask(boardId, id);
      return tasks;
    },
  });

  fastify.post<{ Params: IParams; Body: TaskType }>('/boards/:boardId/tasks', {
    handler: async (req, reply) => {
      const {
        params: { boardId },
        body,
      } = req;
      reply.code(201);
      const tasks = service.add(boardId, body);
      return tasks;
    },
  });

  fastify.put<{ Params: IParams; Body: TaskType }>('/boards/:boardId/tasks/:id', {
    handler: async (req, reply) => {
      const {
        params: { boardId, id },
        body,
      } = req;
      reply.code(200);
      const renewed = service.update(boardId, id, body);
      return renewed;
    },
  });

  fastify.delete<{ Params: IParams }>('/boards/:boardId/tasks/:id', {
    handler: async (req, reply) => {
      const {
        params: { boardId, id },
      } = req;
      service.remove(boardId, id);
      reply.code(204);
    },
  });
};
