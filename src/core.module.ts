import {  Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { RolesModule } from './roles/roles.module';
import { EventEmitterModule } from "@nestjs/event-emitter";
import { AuthModule } from './auth/auth.module';
import { BullModule } from "@nestjs/bull";
import { CacheInterceptor, CacheModule } from "@nestjs/cache-manager";
import { APP_INTERCEPTOR } from "@nestjs/core";
import * as redisStore from 'cache-manager-redis-store';

@Module({
    providers: [{
        provide: APP_INTERCEPTOR,
        useClass: CacheInterceptor,
      },],
    controllers: [],

    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOSTNAME,
            port: 5432,
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            autoLoadEntities: true,
            synchronize: true,
          }),
        EventEmitterModule.forRoot({
            wildcard: true,
        }),
        BullModule.forRoot({
            redis: {
              host: process.env.REDIS_HOST || 'redis',
              port: Number(process.env.REDIS_PORT) || 6379,
            },
        }),
        CacheModule.register({ 
            isGlobal: true,
            store: redisStore,
            host: process.env.REDIS_HOST,
            port: 6379, 
        }),


        UsersModule,
        RolesModule,
        AuthModule,
    ],
    exports: [

    ]
})
export class CoreModule {

  

}