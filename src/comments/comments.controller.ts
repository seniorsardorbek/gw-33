import { Controller, Post, Get, Body, Param, Req, UseGuards } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './comments.service';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }



  @UseGuards(AuthGuard)
  @Post()
  async create(@Req() req: any, @Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(req, createCommentDto);

  }

  @Get(':productId')
  async findByProduct(@Param('productId') productId: string) {
    return this.commentService.findByProduct(productId);
  }
}
