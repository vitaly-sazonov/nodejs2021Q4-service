import pino, { TransportMultiOptions } from 'pino';

import config from './config';

const { LOG_ERR_LEVEL, LOG_INFO_LEVEL } = config;

const transport = pino.transport(<TransportMultiOptions>{
  targets: [
    {
      level: LOG_ERR_LEVEL,
      target: 'pino/file',
      options: { destination: './error.log' },
    },
    {
      level: LOG_INFO_LEVEL,
      target: 'pino/file',
      options: { destination: './info.log' },
    },
  ],
});

export default pino(transport);
