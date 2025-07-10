import {NestFactory} from "@nestjs/core";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {AppModule} from "./app.module";
import {ValidationPipe} from "@nestjs/common";
import {AppConfigService} from "./config/app.config.service";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const appConfig = app.get(AppConfigService).appConfig;

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
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config, {
        extraModels: [],
    });
    SwaggerModule.setup('api', app, document);

    await app.listen(appConfig.port);
}

bootstrap();
