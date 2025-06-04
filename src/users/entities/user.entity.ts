import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { timeStamp } from 'console';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
})
export class User {
  @Prop({ required: true, })
  fullname: string;


  @Prop({ required: false, })
  profile: string;

  @Prop({ type: "number", required: false })
  age: number;

  @Prop({ type: "string", required: true, default: 'client', enum: ['admin', "client", 'seller'] })
  role: 'admin' | "client" | "seller";

  @Prop({ type: "number", enum: ["male", "female"], required: false })
  gender: number;


  @Prop({ type: "string", required: false, unique: true })
  phonenumber: string;


  @Prop({ type: "string", required: false, unique: true })
  email: string;


  @Prop({ type: "boolean", default: false })
  verified: boolean


  @Prop({ type: "string", required: true })
  password: string

}

export const UserSchema = SchemaFactory.createForClass(User);
