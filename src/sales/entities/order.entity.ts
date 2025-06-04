import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { timeStamp } from 'console';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})
export class Order {
    @Prop({ type: SchemaTypes.Number, min: 1 })
    quantity: number;

    @Prop({ type: SchemaTypes.ObjectId, ref: "Sale" })
    sale: string

    @Prop({ type: SchemaTypes.ObjectId, ref: "Product" })
    product: string

}

export const OrderSchema = SchemaFactory.createForClass(Order);
