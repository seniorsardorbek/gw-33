import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './comments.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get(':productId')
  async findByProduct(@Param('productId') productId: string) {
    return this.commentService.findByProduct(productId);
  }
}
