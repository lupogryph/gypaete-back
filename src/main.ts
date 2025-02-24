import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MeetingDto } from './meeting/dto/meeting.dto';

const SERVER_PORT = process.env.PORT || 1337;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Conseil de Cycle')
    .setDescription('API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [],
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(SERVER_PORT);
}
bootstrap();
