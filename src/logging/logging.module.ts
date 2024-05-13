import { Module } from '@nestjs/common';
import { LoggerModule } from '@/logger/logger.module';
import { LoggingInterceptor } from './logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [LoggerModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class LoggingModule {}
