import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Permition } from '../../shared/decorators/permition.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {
    //
  }

  @Post()
  @Permition({ resources: 'product', action: 'create' })
  async create(@Body() createProductDto: CreateProductDto) {
    const productExists = await this.productService.findByName(
      createProductDto.name,
    );

    if (productExists) {
      throw new ConflictException('Product already exists');
    }

    const productCreated = await this.productService.create(createProductDto);

    return {
      message: 'Product created successfully',
      id: productCreated.id,
    };
  }

  @Get()
  @Permition({ resources: 'product', action: 'read' })
  async findAll() {
    return this.productService.findAll();
  }

  @Delete(':id')
  @Permition({ resources: 'product', action: 'delete' })
  async remove(@Param('id') id: string) {
    const productExists = await this.productService.findById(Number(id));

    if (!productExists) {
      throw new NotFoundException('Product does not exists');
    }

    const productRemoved = await this.productService.remove(+id);

    return {
      message: 'Product removed successfully',
      id: productRemoved.id,
      name: productRemoved.name,
    };
  }
}
