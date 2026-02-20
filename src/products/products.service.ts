import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from './models/product.model';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async create(data: CreateProductInput): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  async findOne(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateProductInput): Promise<Product> {
    const { id: _, ...rest } = data;
    return this.prisma.product.update({
      where: { id },
      data: rest,
    });
  }

  async remove(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }
}
