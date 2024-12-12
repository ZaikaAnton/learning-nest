import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const BASE_PREFIX = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(BASE_PREFIX);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
