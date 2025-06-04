import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private ProductModel: Model<Product>) { }
  async create(createProductDto: CreateProductDto) {
    const createdCat = new this.ProductModel(createProductDto);
    return await createdCat.save();
  }

  async findAll() {
    return await this.ProductModel.find().populate('category').exec();
  }

  async findOne(id: string) {
    return await this.ProductModel.findById(id).exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.ProductModel.findByIdAndUpdate(id, updateProductDto).exec();
  }

  async remove(id: string) {
    return await this.ProductModel.findByIdAndDelete(id)
  }
}
