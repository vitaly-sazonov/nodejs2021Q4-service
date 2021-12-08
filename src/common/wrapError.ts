module.exports = (func) => async (req, reply) => {
  try {
    const result = await func(req, reply);
    return result;
  } catch (e) {
    reply.code(404);
    return e.message;
  }
};
