import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/product/entities/product.entity';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Sale } from './entities/sale.entity';
import { Order } from './entities/order.entity';
import { ErrorHandler } from 'src/common/error.handler';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Sale.name) private saleModel: Model<Sale>,
    @InjectModel(Order.name) private orderModel: Model<Order>
  ) { }

  async create(createSaleDto: CreateSaleDto, req: any) {
    try {
      console.log(req.user);
      const comfort_date = createSaleDto?.comfort_date
      const user = await this.userModel.findById("682f0317f714afd64efdec21")
      console.log(user);
      if (!user) {
        throw new UnauthorizedException("Client not found")
      }

      let total_price = 0
      let sale = await this.saleModel.create({ address: createSaleDto.address, comfort_date, user: user._id, total_price })

      const orders = await Promise.all(
        createSaleDto.orders.map(async (order) => {
          const product = await this.productModel.findById(order.product_id);
          if (!product) {
            throw new BadRequestException(`Product not found: ${order.product_id}`);
          }
          await this.productModel.findByIdAndUpdate(product?._id, { quantity: product.quantity - order.quantity })
          total_price += (product.price * order.quantity)

          const newOrder = await this.orderModel.create({
            product: product.id,
            quantity: order.quantity,
            sale: sale.id,
          });

          return newOrder;
        })
      );

      await sale.updateOne({ total_price })

      return { sale, orders }
    } catch (error) {
      ErrorHandler(error)
    }

  }

  async findAll() {
    const sales = await this.saleModel.find().populate([{
      path: 'orders',
      populate: {
        path: 'product',
        model: 'Product', // Make sure 'Product' is the correct model name
      },
    }, {
      path: 'user',
    }])
    return sales
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
