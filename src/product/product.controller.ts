import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, UseInterceptors, UploadedFile, ParseFilePipe, UploadedFiles } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { imagesUploadOptions } from 'src/common/multer';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('images', 10, imagesUploadOptions))

  create(@Body() createProductDto: CreateProductDto, @UploadedFiles(

  )
  files: Express.Multer.File[]) {

    return this.productService.create(createProductDto, files);
  }



  @Roles('client', 'admin')
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  findAll(@Req() req: any, @Query('category',) category: string,) {
    return this.productService.findAll(req, { category });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
