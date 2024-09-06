import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import the ConfigModule from the correct module
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';// Import the ConfigModule from the correct module
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalException } from './exceptions/global.exception';
import { LoggingMiddleware } from './middlewares/logging.middleware';
import { UserModule } from './modules/user/user.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsModule } from './modules/questions/questions.module';
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
			cache: true,
			expandVariables: true,
		}),
		TypeOrmModule.forRootAsync({
			imports: [SharedModule],
			useFactory: (configService: ApiConfigService) =>
				configService.postgresConfig,
			inject: [ApiConfigService],
		}),
		UserModule,
		QuestionsModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_FILTER,
			useClass: GlobalException,
		},
	],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
