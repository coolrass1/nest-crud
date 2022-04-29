import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[ JwtModule.register({
    secret:jwtConstants.secret,
    signOptions: {  },
  }),UsersModule],
  providers: [AuthsService,JwtStrategy],
  controllers: [AuthsController]
})
export class AuthsModule {}
