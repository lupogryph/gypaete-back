import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {Logger, ValidationPipe} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import * as path from "node:path";
import {NestExpressApplication} from "@nestjs/platform-express";
import * as classTransformer from 'class-transformer';
import * as classValidator from 'class-validator';

async function bootstrap() {
    const logger = new Logger('Bootstrap');
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const appConfig = app.get(ConfigService).get('app');

    app.enableCors();

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            transformerPackage: classTransformer,
            validatorPackage: classValidator,
        })
    );

    app.useStaticAssets(path.join(__dirname, '..', 'files'), {prefix: '/files/'});

    // swagger
    logger.log(`Mode: ${process.env.MODE}`);
    if (process.env.MODE === 'DEV') {
        const {DocumentBuilder, SwaggerModule} = await import('@nestjs/swagger');
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
        logger.log("Swagger init sur /api");
    }

    await app.listen(appConfig.port);
    logger.log(`App started at http://localhost:${appConfig.port}/`);
}

bootstrap();
