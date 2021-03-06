/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('API');
const port = process.env.port || 3333;

async function bootstrap() {
  const app = await await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  await app.listen(port);
  return `http://localhost:${port}`;
}

bootstrap().then(url => {
  logger.log(`Listening at ${url}`);
});
