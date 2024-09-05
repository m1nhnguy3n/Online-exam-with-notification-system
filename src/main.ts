import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SharedModule } from './shared/shared.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { configSwagger } from './configs/setup-swagger';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { ERRORS_DICTIONARY } from './constraints/error-dictionary.constraint';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.select(SharedModule).get(ApiConfigService);
  const port = configService.serverConfig.port;
  if (configService.documentationEnabled) {
    configSwagger(app);
  }
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) =>
        new BadRequestException({
          message: ERRORS_DICTIONARY.VALIDATION_ERROR,
          details: errors
            .map((error) => Object.values(error.constraints))
            .flat(),
        }),
    }),
  );
  await app.listen(port);
  console.info(`🚀 Server running on: http://localhost:${port}/api-docs`);
}
bootstrap();
