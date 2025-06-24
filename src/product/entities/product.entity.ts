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


  @Prop({ type: [String], required: true, default: [] })
  images: string[];

  @Prop({ type: "number", required: true })
  price: number;


  @Prop({ type: "number", required: true, default: 0 })
  quantity: number


  @Prop({ type: "string", required: true, default: "N/A" })
  description: string;

  @Prop({ type: "string", required: false, default: "N/A" })
  brand: string;

  // create sizes 
  @Prop({ type: [String], required: false, default: [] })
  sizes: string[];

  //create stars
  @Prop({ type: "number", required: false, default: 4.4 })
  stars: number;

  @Prop({ type: [String], required: false, default: [] })
  colors: string[];

  @Prop({ ref: "Category", type: SchemaTypes.ObjectId, required: true })
  category: string
}

export const ProductSchema = SchemaFactory.createForClass(Product);
