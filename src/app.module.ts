import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from './posts/posts.controller';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { AuthsModule } from './auths/auths.module';
import configuration from './config/configuration';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [


    ConfigModule.forRoot(),
MongooseModule.forRoot( `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.vgtpa.mongodb.net/${process.env.MONGO_ATLAS_DB}?retryWrites=true&w=majority`),
 
    AccountsModule,
    PostsModule,
    UsersModule,
    AuthsModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
