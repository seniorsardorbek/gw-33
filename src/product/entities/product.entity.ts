import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { timeStamp } from 'console';
import { HydratedDocument, Mongoose, SchemaTypes } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
})
export class Product {
  @Prop({ required: true, })
  name: string;

  @Prop({ type: "number", required: true })
  price: number;


  @Prop({ type: "number", required: true, default: 0 })
  quantity: number


  @Prop()
  color: string

  @Prop({ ref: "Category", type: SchemaTypes.ObjectId, required: true })
  category: string
}

export const ProductSchema = SchemaFactory.createForClass(Product);
