/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.port || 3333;
  await app.listen(port);
  return `http://localhost:${port}`;
}

bootstrap().then(url => {
  console.log(`Listening at ${url}`);
});
