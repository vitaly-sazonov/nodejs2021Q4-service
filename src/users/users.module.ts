import { Module } from '@nestjs/common';
import { ProductsService } from './users.service';
import { ProductsController } from './users.controller';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [],
})
export class ProductsModule {}
