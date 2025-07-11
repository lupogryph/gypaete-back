import {NestFactory} from "@nestjs/core";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {AppModule} from "./app.module";
import {ValidationPipe} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const appConfig = app.get(ConfigService).get('app');

    app.enableCors();

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
        }),
    );

    // swagger
    const config = new DocumentBuilder()
        .setTitle(appConfig.name)
        .setDescription('API')
        .setVersion(appConfig.version)
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config, {
        extraModels: [],
    });
    SwaggerModule.setup('api', app, document);

    await app.listen(appConfig.port);
}

bootstrap();
