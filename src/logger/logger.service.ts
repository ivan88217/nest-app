import {
  LoggerService as NestLoggerService,
  Injectable,
  LogLevel,
} from '@nestjs/common';
import { log4jsConfig } from './logger.config';
import * as log4js from 'log4js';

@Injectable()
export class LoggerService implements NestLoggerService {
  protected logger: log4js.Logger;

  constructor() {
    log4js.configure(log4jsConfig);
    this.logger = log4js.getLogger();
  }

  log(message: any, ...optionalParams: any[]) {
    if (optionalParams.length > 0) {
      this.logger.info(message, optionalParams);
    } else {
      this.logger.info(message);
    }
  }

  error(message: any, ...optionalParams: any[]) {
    if (optionalParams.length > 0) {
      this.logger.error(message, optionalParams);
    } else {
      this.logger.error(message);
    }
  }

  warn(message: any, ...optionalParams: any[]) {
    if (optionalParams.length > 0) {
      this.logger.warn(message, optionalParams);
    } else {
      this.logger.warn(message);
    }
  }

  debug?(message: any, ...optionalParams: any[]) {
    if (optionalParams.length > 0) {
      this.logger.debug(message, optionalParams);
    } else {
      this.logger.debug(message);
    }
  }

  verbose?(message: any, ...optionalParams: any[]) {
    if (optionalParams.length > 0) {
      this.logger.trace(message, optionalParams);
    } else {
      this.logger.trace(message);
    }
  }

  fatal?(message: any, ...optionalParams: any[]) {
    if (optionalParams.length > 0) {
      this.logger.fatal(message, optionalParams);
    } else {
      this.logger.fatal(message);
    }
  }
  setLogLevels?(levels: LogLevel[]) {
    let level: LogLevel | 'info';
    if (level === 'log') {
      level = 'info';
    } else {
      level = levels[0];
    }
    this.logger.level = level;
  }
}

export class ConsoleLoggerService extends LoggerService {
  constructor() {
    super();
    this.logger = log4js.getLogger('console');
  }
}

export class FileLoggerService extends LoggerService {
  constructor() {
    super();
    this.logger = log4js.getLogger('file');
  }
}
