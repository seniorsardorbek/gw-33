import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment, CommentDocument } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) { }

  async create(req: any, createCommentDto: CreateCommentDto): Promise<Comment> {
    console.log(req.user);
    const newComment = new this.commentModel({ ...createCommentDto, user_id: req.user.id });
    return newComment.save();
  }

  async findByProduct(product_id: string): Promise<Comment[]> {
    return this.commentModel
      .find({ product_id })
      .populate('user_id', 'name')
      .sort({ created_at: -1 })
      .exec();
  }
}
