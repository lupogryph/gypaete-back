import {NestFactory} from "@nestjs/core";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {AppModule} from "./app.module";
import {ValidationPipe} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import * as path from "node:path";
import {NestExpressApplication} from "@nestjs/platform-express";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const appConfig = app.get(ConfigService).get('app');

    app.enableCors();

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
        }),
    );

    app.useStaticAssets(path.join(__dirname, '..', 'files'));

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
