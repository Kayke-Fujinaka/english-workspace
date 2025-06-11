import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { env } from './config/environment.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors();

  app.setGlobalPrefix(env.API_PREFIX);

  const config = new DocumentBuilder()
    .setTitle('English Workspace API')
    .setDescription('API to manage English studies')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${env.API_PREFIX}/docs`, app, document);

  await app.listen(env.PORT, () => {
    Logger.debug(
      `Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`,
      'NestApplication',
    );
    Logger.debug(
      `Swagger docs available at http://localhost:${env.PORT}/${env.API_PREFIX}/docs`,
      'NestApplication',
    );
  });
}
bootstrap();
