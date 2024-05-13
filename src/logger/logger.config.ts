const log4jsConfig = {
  appenders: {
    file: {
      type: 'dateFile',
      filename: 'logs/log',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
    },
    console: {
      type: 'console',
    },
  },
  categories: {
    default: {
      appenders: ['file', 'console'],
      level: 'debug',
    },
  },
};

export { log4jsConfig };
