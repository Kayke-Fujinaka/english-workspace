import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('English Workspace API')
    .setDescription('API to manage English studies')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = 8080;
  await app.listen(port, () => {
    Logger.debug(`Server is running on port ${port}`, 'NestApplication');
  });
}
bootstrap();
