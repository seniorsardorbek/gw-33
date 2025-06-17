import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { SalesModule } from './sales/sales.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    JwtModule.register({}), MongooseModule.forRoot('mongodb+srv://javah1223:javah1223@cluster0.lwqtr.mongodb.net/store'), ProductModule, UsersModule, AuthModule, CategoryModule, SalesModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
