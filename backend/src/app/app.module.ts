import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransientLoggerModule } from '../logging/transient-logger.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configFactory } from '../config/config.factory';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { HealthModule } from '../health/health.module';
import { Config } from '../config/config.model';
import { TransientLoggerService } from '../logging/transient-logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configFactory],
        }),
        TransientLoggerModule,
        AuthModule,
        UsersModule,
        TypeOrmModule.forRootAsync({
            useFactory: async (
                configService: ConfigService<Config>,
                logger: TransientLoggerService,
            ) => {
                const dbConfig = configService.get('db');
                return {
                    ...dbConfig,
                    autoLoadEntities: true,
                    logging: log => dbConfig.loggingFn(logger, log),
                };
            },
            inject: [ConfigService, TransientLoggerService],
        }),
        HealthModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'www'),
            exclude: ['/api*'],
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
