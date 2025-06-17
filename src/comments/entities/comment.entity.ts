import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: { createdAt: 'created_at' } })
export class Comment {

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product_id: Types.ObjectId;

  @Prop({ required: true, type: String })
  comment: string;

  @Prop({ required: true, type: Number, min: 1, max: 5 })
  stars: number;

  @Prop()
  created_at: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
