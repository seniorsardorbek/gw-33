import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { timeStamp } from 'console';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type SaleDocument = HydratedDocument<Sale>;

@Schema({
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})
export class Sale {
    @Prop({ type: "string", required: true })
    comfort_date: number;


    @Prop({ type: SchemaTypes.String, enum: ['refunded', 'packing', "saled", 'waiting'], default: 'packing' })
    status: 'refunded' | 'packing' | "saled" | 'waiting';

    @Prop({ type: "number", required: true, min: 0, default: 0 })
    total_price: number

    @Prop({ type: SchemaTypes.ObjectId, required: true, ref: "User" })
    user: string

    @Prop({ type: "string", required: true })
    address: string

}
// enum


export const SaleSchema = SchemaFactory.createForClass(Sale);

SaleSchema.virtual('orders', {
    ref: 'Order', // name of the model to populate
    localField: '_id', // field in Sale
    foreignField: 'sale', // field in Order that references Sale
});