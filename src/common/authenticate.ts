import fp from 'fastify-plugin';

import bcrypt = require('bcryptjs');

const allowed = ['users', 'tasks', 'boards'];

export const genHashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_SIZE as string, 10));
  const out = await bcrypt.hash(password, salt);
  return out;
};

export default fp(async (fastify) => {
  fastify.addHook('preValidation', async (req, reply) => {
    try {
      const route = req.url.split('/');
      if (allowed.includes(route[1])) {
        await req.jwtVerify();
      }
    } catch (err) {
      reply.code(401).send();
    }
  });
});
