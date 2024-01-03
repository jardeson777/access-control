import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from '../../shared/database/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {
    //
  }

  async create(createProductDto: CreateProductDto) {
    const productCreated = this.prisma.product.create({
      data: createProductDto,
    });

    return productCreated;
  }

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findByName(name: string) {
    return this.prisma.product.findUnique({
      where: {
        name,
      },
    });
  }

  async findById(id: number) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
