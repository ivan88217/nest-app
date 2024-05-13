import { Module } from '@nestjs/common';
import {
  LoggerService,
  FileLoggerService,
  ConsoleLoggerService,
} from './logger.service';

@Module({
  providers: [LoggerService, FileLoggerService, ConsoleLoggerService],
  exports: [LoggerService, FileLoggerService, ConsoleLoggerService],
})
export class LoggerModule {}
