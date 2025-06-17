import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentService } from './comments.service';
import { CommentController } from './comments.controller';
import { Comment, CommentSchema } from './entities/comment.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  controllers: [CommentController],
  providers: [CommentService, JwtService],
})
export class CommentsModule { }
