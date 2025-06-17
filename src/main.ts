import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:5173', 'https://nest-2-2.vercel.app', "http://localhost:3000"],
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
    },
  });

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());


  await app.listen(process.env.PORT ?? 3535);
}
bootstrap();
