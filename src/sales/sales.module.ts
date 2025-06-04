import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { Sale, SaleSchema } from './entities/sale.entity';
import { Order, OrderSchema } from './entities/order.entity';
import { Product, ProductSchema } from 'src/product/entities/product.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: Product.name, schema: ProductSchema },
    { name: Sale.name, schema: SaleSchema },
    { name: Order.name, schema: OrderSchema }])],
  controllers: [SalesController],
  providers: [SalesService, JwtService],
})
export class SalesModule { }
