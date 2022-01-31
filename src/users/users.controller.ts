import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './users.service';

// express
// app.use((req, res, next) => {
//   res.status(201).end('Poka')
// })

@Controller('users')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Get()
  // // @Redirect('https://google.com', 301)
  // getAll(@Req() req: Request, @Res() res: Response): string {
  //   res.status(201).end('Poke')
  //   return 'getAll'
  // }

  @Get()
  getAll(): string {
    return this.productsService.getAll();
  }

  // @Get(':id')
  // getOne(@Param('id') id: string): string {
  //   return this.productsService.getById(id);
  // }

  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // @Header('Cache-Control', 'none')
  // create(@Body() createProductDto: CreateProductDto): Promise<Product> {
  //   return this.productsService.create(createProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<Product> {
  //   return this.productsService.remove(id);
  // }

  // @Put(':id')
  // update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string): Promise<Product> {
  //   return this.productsService.update(id, updateProductDto);
  // }
}
