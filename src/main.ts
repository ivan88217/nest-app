import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from '@/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = app.get(LoggerService);
  app.useLogger(logger);
  const port = process.env.PORT || 3000;
  await app.listen(3000, () =>
    logger.log(`Server is running on http://localhost:${port}}`),
  );
}
bootstrap();
