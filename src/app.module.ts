import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { LoggingModule } from './logging/logging.module';

@Module({
  imports: [LoggerModule, LoggingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
