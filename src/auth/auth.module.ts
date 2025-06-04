import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [

    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'abuganiyev60@gmail.com',
          pass: 'ercrgmmqbkaaguwd',
        }
      }
    }),
    CacheModule.register(),

    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [AuthController],
  providers: [AuthService, JwtService,],
  // exports: [AuthService]

})
export class AuthModule { }
