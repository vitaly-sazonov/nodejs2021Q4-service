const wrapError = require('../../common/wrapError');
const service = require('./tasks.service');

// TODO Task (boards/:boardId/tasks route)
// TODO GET boards/:boardId/tasks - get all tasks
// TODO GET boards/:boardId/tasks/:taskId - get the task by id
// TODO POST boards/:boardId/tasks - create task
// TODO PUT boards/:boardId/tasks/:taskId - update task
// TODO DELETE boards/:boardId/tasks/:taskId - delete task

module.exports = async (fastify) => {
  fastify.get('/boards/:boardId/tasks', {
    handler: async (req, reply) => {
      const {
        params: { boardId },
      } = req;
      reply.code(200);
      const tasks = await service.getAll(boardId);
      return tasks;
    },
  });

  fastify.get('/boards/:boardId/tasks/:id', {
    handler: wrapError(async (req, reply) => {
      const {
        params: { boardId, id },
      } = req;
      reply.code(200);
      const tasks = await service.getTask(boardId, id);
      return tasks;
    }),
  });

  fastify.post('/boards/:boardId/tasks', {
    handler: async (req, reply) => {
      const {
        params: { boardId },
        body,
      } = req;
      reply.code(201);
      const tasks = await service.add(boardId, body);
      return tasks;
    },
  });

  fastify.put('/boards/:boardId/tasks/:id', {
    handler: wrapError(async (req, reply) => {
      const {
        params: { boardId, id },
        body,
      } = req;
      reply.code(200);
      const renewed = await service.update(boardId, id, body);
      return renewed;
    }),
  });

  fastify.delete('/boards/:boardId/tasks/:id', {
    handler: async (req, reply) => {
      const {
        params: { boardId, id },
      } = req;
      await service.remove(boardId, id);
      reply.code(204);
    },
  });
};
