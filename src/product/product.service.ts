import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private ProductModel: Model<Product>) { }
  async create(createProductDto: CreateProductDto, files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No images uploaded');
    }

    // Map the uploaded files to their paths
    const images = files?.map(file => file.path);
    // rest 
    const createdCat = new this.ProductModel({ ...createProductDto, images });
    return await createdCat.save();
  }

  async findAll(req: any, { category }: { category?: string }) {

    const query: any = {};
    if (category) {
      query.category = category;
    }

    return await this.ProductModel.find(query).populate('category').exec();
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
