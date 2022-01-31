import { Injectable } from '@nestjs/common';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  getAll(): string {
    return 'getAll';
  }

  // async getById(id: string): Promise<Product> {
  //   return this.productModel.findById(id);
  // }

  // async create(productDto: CreateProductDto): Promise<Product> {
  //   const newProduct = new this.productModel(productDto);
  //   return newProduct.save();
  // }

  // async remove(id: string): Promise<Product> {
  //   return this.productModel.findByIdAndRemove(id);
  // }

  // async update(id: string, productDto: UpdateProductDto): Promise<Product> {
  //   return this.productModel.findByIdAndUpdate(id, productDto, { new: true });
  // }
}
