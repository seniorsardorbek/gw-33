import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';
import { ErrorHandler } from 'src/common/error.handler';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private CategoryModel: Model<Category>) { }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const createdCategory = new this.CategoryModel(createCategoryDto);
      return await createdCategory.save();
    } catch (error) {
      ErrorHandler(error)
    }
  }

  async findAll() {
    return await this.CategoryModel.find().exec();
  }

  async findOne(id: string) {
    return await this.CategoryModel.findById(id).exec();
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.CategoryModel.findByIdAndUpdate(id, updateCategoryDto);
  }

  async remove(id: string) {
    return await this.CategoryModel.findByIdAndDelete(id);
  }
}
