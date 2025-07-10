import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {ApiConfigService} from "./config/api.config.service";

const SERVER_PORT = process.env.PORT || 1337;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apiConfig = app.get(ApiConfigService).apiConfig;

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Chalet le Gypaete')
    .setDescription('API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [],
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(apiConfig.port);
}
bootstrap();
