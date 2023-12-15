import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configurations from '../../configurations/index';
import { User } from '../user/models/user.model';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../token/token.module';
import { WordsModule } from '../words/words.module';
import { Words } from '../words/models/words.model';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load:[configurations]
  }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService:ConfigService) => ({
        dialect: "postgres",
        host: configService.get('db_host'),
        port: configService.get('db_port'),
        password: configService.get('db_password'),
        database: configService.get('db_name'),
        username: configService.get('db_user'),
        synchronize: true,
        autoLoadModels: true,
        models:[User, Words]
      })
    }),
    UserModule,
    AuthModule,
    TokenModule,
    WordsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
